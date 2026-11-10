const express = require('express');
const mysql = require('mysql2');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school'
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL');
});

// READ — list all students
app.get('/main', (req, res) => {
  db.query('SELECT * FROM students', (err, rows) => {
    if (err) return res.send(err.message);
    res.render('index', { students: rows });
  });
});

// CREATE — add a student
app.post('/add', (req, res) => {
  const { name, course } = req.body;
  db.query(
    'INSERT INTO students (name, course) VALUES (?, ?)',
    [name, course],
    (err) => {
      if (err) return res.send(err.message);
      res.redirect('/main');
    }
  );
});

// UPDATE form — show current values
app.get('/edit/:id', (req, res) => {
  db.query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) return res.send(err.message);
    res.render('edit', { student: rows[0] });
  });
});

// UPDATE — save changes
app.post('/update/:id', (req, res) => {
  const { name, course } = req.body;
  db.query(
    'UPDATE students SET name = ?, course = ? WHERE id = ?',
    [name, course, req.params.id],
    (err) => {
      if (err) return res.send(err.message);
      res.redirect('/main');
    }
  );
});

// DELETE — remove a student
app.post('/delete/:id', (req, res) => {
  db.query('DELETE FROM students WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.send(err.message);
    res.redirect('/main');
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/main');
});