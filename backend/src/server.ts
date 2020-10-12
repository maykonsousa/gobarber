import express from 'express';
import 'reflect-metadata';
import routes from './routes';
import './database';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server running on Port 3333');
});

export default app;
