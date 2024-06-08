import express from 'express';
import path from 'path';
import gitRouter from './routes/git.js'
import { errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const appDirectory = process.cwd(); //當前工作資料夾

app.use(express.json());

app.use(express.static(path.join(appDirectory, 'server', 'public')));

app.use('/api', gitRouter);

app.use(errorHandler)

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}