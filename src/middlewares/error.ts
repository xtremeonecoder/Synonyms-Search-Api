/**
 * Synonyms Search Tool
 *
 * @category   Application_Backend
 * @package    synonym-search-backend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import type { Request, Response } from 'express';

/**
 * Express Error Middleware
 *
 * This middleware function handles errors and
 * sends an error response with a 500 status code.
 *
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
const errorMiddleWare = (req: Request, res: Response): void => {
  // Return error message in response
  res.status(500).json({ error: 'Something went wrong!' });
};

export default errorMiddleWare;
