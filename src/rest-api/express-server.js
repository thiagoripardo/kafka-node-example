import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { loadRoutes } from '../utils/utils';
import * as kafkaProducer from '../services/producer.service';

export default async () => {

  // Express instance
  const app = express();

  const debug = Boolean(Number(process.env.DEBUG)) || false;

  // Setting up general middlewares
  if (debug) {
    app.use(morgan('dev'));
  }
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  try {
    await kafkaProducer.init();
    app.use((req, res, next) => {
      req.kafkaProducer = kafkaProducer;
      return next();
    });
  } catch (err) {
    console.error(err);
  }

  // Auto load routes
  const routesV1Path = `${path.resolve(__dirname)}/routes/v1/`;
  console.log(routesV1Path)
  await loadRoutes(routesV1Path, '', app);

  return http.createServer(app);
};