import express from 'express';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import accountRoutes from './routes/accountRoutes.js';

const app = express();

app.use(express.json());

app.use('/', authRoutes);
app.use('/', taskRoutes);
app.use('/', accountRoutes);


const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
