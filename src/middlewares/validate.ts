/**
 * Synonyms Search Tool
 *
 * @category   Application_Backend
 * @package    synonym-search-backend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import type Joi from 'joi';
import type { Request, Response, NextFunction } from 'express';

/**
 * Joi Validation Middleware
 *
 * This middleware function validates the request data using a Joi validator and handles validation errors.
 *
 * @param {Function} validator - The Joi validator function for validating the request data.
 * @returns {Function} An Express middleware function that validates the request data and handles errors.
 *
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 * @param {NextFunction} next - Express Next function
 */
const validate = (validator: (data: unknown) => Joi.ValidationResult) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Get request body or url params
    const data = Object.keys(req.body).length > 0 ? req.body : req.params;

    // Validate the request data
    const { error } = validator(data);

    // Check if there is any error?
    if (error !== null && error !== undefined) {
      // Return error message in response
      return res.status(400).json({ error: error?.details[0].message });
    }

    // Move to next middleware
    next();
  };
};

export default validate;
