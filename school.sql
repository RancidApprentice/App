CREATE DATABASE IF NOT EXISTS school;
USE school;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  course VARCHAR(100) NOT NULL
);

INSERT INTO students (name, course) VALUES
  ('Ana Reyes', 'BSIT'),
  ('Ben Cruz', 'BSCS'),
  ('Carla Diaz', 'BSIS');