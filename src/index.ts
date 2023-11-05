/**
 * Synonyms Search Tool
 *
 * @category   Application_Backend
 * @package    synonym-search-backend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import express from 'express';

import routes from './startup/routes';

const app = express();
routes(app);

const port = 3001;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;
