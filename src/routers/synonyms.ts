/**
 * Synonyms Search Tool
 *
 * @category   Application_Backend
 * @package    synonym-search-backend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import express from 'express';

import { wordValidator, synonymsValidator } from './validation';
import { validate, handlerMiddleware } from '../middlewares';
import { addSynonyms, findSynonyms, resetMemories } from '../synonyms';
import { capitalizeInputs } from '../utils/word-processor';

// Get express router instance
const router = express.Router();

// Request route for adding word and synonyms
router.post(
  '/',
  [validate(synonymsValidator)],
  handlerMiddleware((req, res) => {
    try {
      // Process input data
      const processedData = capitalizeInputs<typeof req.body>(req.body);

      // Formulate request body
      const { word, synonyms } = processedData;

      // Add the requested word and synonyms
      addSynonyms(word, synonyms);

      // Return success message in response
      res.status(201).json({ message: 'Synonyms added successfully!' });
    } catch (error) {
      // Return error message in response
      res.status(500).json({ error: 'Something went wrong while adding synomyms!' });
    }
  }),
);

// Request route for resetting in-memory
router.get(
  '/reset/memories',
  handlerMiddleware((_, res) => {
    try {
      // Reset memories
      resetMemories();

      // Return success message in response
      res.status(200).json({ message: 'Memory reset successfully!' });
    } catch (error) {
      // Return error message in response
      res.status(500).json({ error: 'Something went wrong while resetting memories!' });
    }
  }),
);

// Request route for search synonyms
router.get(
  '/:word',
  [validate(wordValidator)],
  handlerMiddleware((req, res) => {
    try {
      // Process input data
      const wordToLookup = capitalizeInputs<typeof req.params.word>(req.params.word);

      // Find synonyms for requested word
      const foundSynonyms = findSynonyms(wordToLookup);

      // Check if synomyms found?
      if (foundSynonyms !== undefined) {
        // Return array of synomyms in response
        res.status(200).json({ synonyms: Array.from(foundSynonyms) });
      } else {
        // Return error message in response
        res.status(404).json({ error: 'Word not found!' });
      }
    } catch (error) {
      // Return error message in response
      res.status(500).json({ error: 'Something went wrong while fetching synomyms!' });
    }
  }),
);

export default router;
