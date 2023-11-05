/**
 * Synonyms Search Tool
 *
 * @category   Application_Backend
 * @package    synonym-search-backend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import Joi from 'joi';

/**
 * Synonyms Validator
 *
 * This function validates a data object to ensure it matches the expected structure for synonyms.
 *
 * @param {unknown} data - The data to be validated.
 * @returns {Joi.ValidationResult<unknown>} - The result of the validation.
 */
const synonymsValidator = (data: unknown): Joi.ValidationResult<unknown> => {
  const schema = Joi.object({
    word: Joi.string().required().label('Word'),
    synonyms: Joi.array().items(Joi.string().required()).required().label('Synonyms'),
  });

  return schema.validate(data);
};

/**
 * Word Validator
 *
 * This function validates a data object to ensure it matches the expected structure for a single word.
 *
 * @param {unknown} data - The data to be validated.
 * @returns {Joi.ValidationResult<unknown>} - The result of the validation.
 */
const wordValidator = (data: unknown): Joi.ValidationResult<unknown> => {
  const schema = Joi.object({
    word: Joi.string().required().label('Word'),
  });

  return schema.validate(data);
};

export { wordValidator, synonymsValidator };
