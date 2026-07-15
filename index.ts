import express from 'express';
import cors from 'cors';
import { prisma } from './prisma/prisma';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Тестовый маршрут
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/getTodos', async (req, res) => {
  res.json(await prisma.todo.findMany().then((data) => data));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
