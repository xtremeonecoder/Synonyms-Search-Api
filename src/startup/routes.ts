/**
 * Synonyms Search Tool
 *
 * @category   Application_Backend
 * @package    synonym-search-backend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import synonyms from '../routers/synonyms';
import { errorMiddleWare } from '../middlewares';

// API request routes and middlewares initialization
const routes = (app: express.Express): void => {
  // enables cors
  app.use(cors());

  // adding json as a middle ware to express
  app.use(bodyParser.json());

  // middleware for processing urlencoded values
  app.use(express.urlencoded({ extended: true }));

  // synonyms routers
  app.use('/api/synonyms', synonyms);

  // error handler middleware
  app.use(errorMiddleWare);
};

export default routes;
