/**
 * Synonyms Search Tool
 *
 * @category   Application_Backend
 * @package    synonym-search-backend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import type { Request, Response, NextFunction } from 'express';

/**
 * Express Handler Middleware
 *
 * This middleware function wraps a request handler or middleware function, providing error handling.
 *
 * @param {Function} handler - The request handler or middleware function to be wrapped.
 * @returns {Function} An Express middleware function that invokes the provided handler.
 *
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 * @param {NextFunction} next - Express Next function
 */
const handlerMiddleware = (handler: (req: Request, res: Response) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Router handler or middleware
      // function is called here
      handler(req, res);
    } catch (error) {
      // Move to next middleware
      next(error);
    }
  };
};

export default handlerMiddleware;
