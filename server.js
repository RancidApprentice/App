const express = require('express');
const mysql = require('mysql2');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'school' });

db.connect(err => err ? console.error('DB connection failed:', err.message) : console.log('Connected to MySQL'));

const query = (sql, params, cb) => db.query(sql, params, (err, rows) => err ? cb(err) : cb(null, rows));

app.get('/main', (req, res) =>
  query('SELECT * FROM students', [], (err, rows) =>
    err ? res.send(err.message) : res.render('index', { students: rows })));

app.post('/add', (req, res) => {
  const { name, course } = req.body;
  query('INSERT INTO students (name, course) VALUES (?, ?)', [name, course],
    err => err ? res.send(err.message) : res.redirect('/main'));
});

app.get('/edit/:id', (req, res) =>
  query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, rows) =>
    err ? res.send(err.message) : res.render('edit', { student: rows[0] })));

app.post('/update/:id', (req, res) => {
  const { name, course } = req.body;
  query('UPDATE students SET name = ?, course = ? WHERE id = ?', [name, course, req.params.id],
    err => err ? res.send(err.message) : res.redirect('/main'));
});

app.post('/delete/:id', (req, res) =>
  query('DELETE FROM students WHERE id = ?', [req.params.id],
    err => err ? res.send(err.message) : res.redirect('/main')));

app.listen(3000, () => console.log('Server running at http://localhost:3000/main'));
