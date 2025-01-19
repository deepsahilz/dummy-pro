import express from 'express';
import { MongoClient, ObjectId } from 'mongodb'; // Import ObjectId
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
let db;
const MONGO_URI = process.env.MONGODB_URI;

// MongoDB connection
MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB');
    db = client.db(DB_NAME); // Set the database
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Middleware
const corsOptions = {
  origin: 'https://todopankaj.vercel.app', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // Use CORS middleware with the specified options
app.use(express.json());

// Helper function to handle errors
const handleError = (res, err, status = 500, message = 'Internal Server Error') => {
  console.error(err);
  res.status(status).json({ error: message });
};

// Routes

app.get('/', async (req, res) => {
  res.send("working server")
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await db.collection('todos').find().toArray();
    res.json(todos);
  } catch (err) {
    handleError(res, err, 500, 'Failed to fetch todos');
  }
});

// Add a new to-do
app.get('/todos', async (req, res) => {
  try {
    // Ensure the database object exists
    if (!db) {
      throw new Error('Database connection is not initialized');
    }

    const todos = await db.collection('todos').find().toArray();
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err.message); // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch todos', details: err.message });
  }
});

// Update a to-do (edit the title or status)
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  if (!title && !status) {
    return res.status(400).json({ error: 'Title or status is required' });
  }

  try {
    const result = await db.collection('todos').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'To-do not found' });
    }

    res.json({ id, title, status });
  } catch (err) {
    handleError(res, err, 500, 'Failed to update to-do');
  }
});

// Delete a to-do
app.delete('/todos/:id', async (req, res) => {
  const todoId = req.params.id;

  if (!todoId) {
    return res.status(400).json({ error: 'Todo ID is required' });
  }

  try {
    const result = await db.collection('todos').deleteOne({ _id: new ObjectId(todoId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    handleError(res, err, 500, 'Failed to delete todo');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
