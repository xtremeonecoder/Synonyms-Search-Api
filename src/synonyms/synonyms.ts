/**
 * Synonyms Search Tool
 *
 * @category   Application_Backend
 * @package    synonym-search-backend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import { applyTransitiveRule } from '../transitive-rule';
import type { ISynonym } from '../data-structure/interfaces';

// Store the synonyms in a Map
const synonyms: Map<string, ISynonym> = new Map<string, ISynonym>();

/**
 * Add Synonyms
 *
 * This function adds synonyms to a given word in the synonyms data store.
 *
 * @param {string} givenWord - The word to which synonyms will be added.
 * @param {string[]} synonymsToAdd - An array of synonyms to be added to the word.
 * @returns {void}
 */
export function addSynonyms(givenWord: string, synonymsToAdd: string[]): void {
  // Check if the word already exists in the Map
  if (!synonyms.has(givenWord)) {
    // If it doesn't exist, add it along with its synonyms
    const synonymsSet = new Set(synonymsToAdd);
    synonyms.set(givenWord, { word: givenWord, synonyms: synonymsSet });

    // Ensure transitive synonyms
    applyTransitiveRule({
      givenWord,
      synonymsToAdd,
      synonymsSet,
      synonyms,
    });
  } else {
    // If the word already exists, add new
    // synonyms and ensure transitive synonyms
    const existingSynonyms = synonyms.get(givenWord)?.synonyms;

    // Check if given word has synonyms?
    if (existingSynonyms !== undefined) {
      // Ensure transitive synonyms
      applyTransitiveRule({
        wordExists: true,
        givenWord,
        synonymsToAdd,
        synonymsSet: existingSynonyms,
        synonyms,
      });
    }
  }
}

/**
 * Find Synonyms
 *
 * This function retrieves synonyms for a given word from the synonyms data store.
 *
 * @param {string} word - The word for which synonyms will be retrieved.
 * @returns {Set<string> | undefined} - A Set of synonyms for the word, or undefined if the word is not found.
 */
export function findSynonyms(word: string): Set<string> | undefined {
  // I could implement the transitive rules logic here also
  return synonyms.get(word)?.synonyms;
}

/**
 * Reset Memories
 *
 * This function resets all memory or cached data within the application.
 * It clears or reinitializes any stored information, settings, or state.
 *
 * @returns {void} - This function has no return value.
 */
export function resetMemories(): void {
  // Clear all the records
  synonyms.clear();
}
