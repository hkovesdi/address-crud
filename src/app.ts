import dotenv from 'dotenv';
import express from 'express';
import { json } from 'body-parser';
import { router } from './routes';
import { onlyAcceptJson } from './middlewares/onlyAcceptJson';
import mongoose from 'mongoose';
import { errorHandler } from './middlewares/errorHandler';

async function main() {
  dotenv.config();

  const app = express();

  app.use(json());
  app.use(onlyAcceptJson);

  app.use(router);

  app.use(errorHandler);

  try {
    await mongoose.connect(process.env.MONGO_URI ?? "");
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(process.env.PORT ?? 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
  });
}

main();