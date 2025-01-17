import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL Connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Get all to-dos
app.get('/todos', async (req, res) => {
  try {
    const [todos] = await pool.query('SELECT * FROM todos');
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});
app.get('/', async (req, res) => {
  res.send("hello");
});

// Add a new to-do
app.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;
    const [result] = await pool.query('INSERT INTO todos (title) VALUES (?)', [title]);
    res.json({ id: result.insertId, title, status: 'pending' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to-do' });
  }
});

// Update a to-do
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    await pool.query('UPDATE todos SET title = ?, status = ? WHERE id = ?', [title, status, id]);
    res.json({ id, title, status });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update to-do' });
  }
});

// Delete a to-do
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    res.json({ message: 'To-do deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete to-do' });
  }
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

export default serverless(app);