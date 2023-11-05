/**
 * Synonyms Search Tool
 *
 * @category   Application_Backend
 * @package    synonym-search-backend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import type {
  IApplyTransitiveRule,
  IMatchGivenSynonymWithExistingWords,
  IMatchGivenWordWithExistingSynonyms,
} from '../data-structure/interfaces';

/**
 * Match Given Synonym With Existing Words
 *
 * This function matches a given synonym with existing words and
 * updates the synonymsSet and the synonyms map, including handling
 * transitive synonym relationships.
 *
 * @param {IMatchGivenSynonymWithExistingWords} params - An object containing parameters.
 * @param {string} params.givenWord - The word to which the synonym is being added.
 * @param {string} params.givenSynonym - The given synonym to match.
 * @param {Set<string>} params.synonymsSet - The set of synonyms to update.
 * @param {Map<string, Synonym>} params.synonyms - The map of existing synonyms.
 * @returns {void} - This function does not return a value.
 */
function matchGivenSynonymWithExistingWords({
  givenWord,
  givenSynonym,
  synonymsSet,
  synonyms,
}: IMatchGivenSynonymWithExistingWords): void {
  if (synonyms.has(givenSynonym)) {
    // Add the matched givenSynonym in the synosymsSet
    synonymsSet.add(givenSynonym);

    // Loop through the synomyms of the matched givenSynomys
    synonyms.get(givenSynonym)?.synonyms.forEach((transitiveSynonym) => {
      if (transitiveSynonym !== givenWord) {
        // Add the synomyms of the matched
        // givenSynomym in the synonymsSet
        synonymsSet.add(transitiveSynonym);
      }
    });

    // Add the givenWord as synonym of the matched givenSynonym
    synonyms.get(givenSynonym)?.synonyms.add(givenWord);

    // Loop through the synonyms of synomymsSet
    synonymsSet.forEach((transitiveSynonym) => {
      if (transitiveSynonym !== givenSynonym) {
        // Add the synomyms of the synonymsSet
        // as the synonym of matched givenSynonym
        synonyms.get(givenSynonym)?.synonyms.add(transitiveSynonym);
      }
    });
  }
}

/**
 * Match Given Word With Existing Synonyms
 *
 * This function matches a given word with existing synonyms, updates
 * the synonyms map, and handles transitive synonym relationships.
 *
 * @param {IMatchGivenWordWithExistingSynonyms} params - An object containing parameters.
 * @param {string} params.givenWord - The word to be matched with existing synonyms.
 * @param {Synonym} params.existingWord - The existing word and its synonyms.
 * @param {Map<string, Synonym>} params.synonyms - The map of existing synonyms.
 * @returns {void} - This function does not return a value.
 */
function matchGivenWordWithExistingSynonyms({
  givenWord,
  existingWord,
  synonyms,
}: IMatchGivenWordWithExistingSynonyms): void {
  if (existingWord.word !== givenWord && existingWord?.synonyms.has(givenWord)) {
    // Add the existingWord as the synosym of givenWord
    synonyms.get(givenWord)?.synonyms.add(existingWord.word);

    // Loop through the synomyms of the existingWord
    existingWord.synonyms.forEach((transitiveSynonym) => {
      if (transitiveSynonym !== givenWord) {
        // Add the synomyms of the existingWord
        // as the synonym of the givenWord
        synonyms.get(givenWord)?.synonyms.add(transitiveSynonym);
      }
    });

    // Add the givenWord as the synosym of existingWord
    synonyms.get(existingWord.word)?.synonyms.add(givenWord);

    // Loop through the synomyms of the givenWord
    synonyms.get(givenWord)?.synonyms.forEach((transitiveSynonym) => {
      if (transitiveSynonym !== existingWord.word) {
        // Add the synomyms of the givenWord
        // as the synonym of the existingWord
        synonyms.get(existingWord.word)?.synonyms.add(transitiveSynonym);
      }
    });
  }
}

/**
 * Apply Transitive Rule
 *
 * This function applies the transitive rule for synonyms. It ensures that transitive synonym relationships
 * are maintained when adding new synonyms for a given word.
 *
 * @param {IApplyTransitiveRule} params - An object containing parameters.
 * @param {string} params.givenWord - The word for which synonyms are being added.
 * @param {boolean} params.wordExists - Indicates whether the given word already exists in the synonyms.
 * @param {string[]} params.synonymsToAdd - An array of synonyms to be added for the given word.
 * @param {Set<string>} params.synonymsSet - A set containing synonyms to maintain transitive synonyms.
 * @param {Map<string, Synonym>} params.synonyms - The map of existing synonyms.
 * @returns {void} - This function does not return a value.
 */
export function applyTransitiveRule({
  givenWord,
  wordExists = false,
  synonymsToAdd,
  synonymsSet,
  synonyms,
}: IApplyTransitiveRule): void {
  // Ensure transitive synonyms for given word
  synonymsToAdd.forEach((synonym) => {
    // While adding synonyms in existing word
    if (wordExists) synonymsSet.add(synonym);

    // Call the function for every given synonym
    matchGivenSynonymWithExistingWords({
      givenWord,
      givenSynonym: synonym,
      synonymsSet,
      synonyms,
    });
  });

  // Ensure transitive synonyms for existing words
  synonyms.forEach((nodeWord) => {
    // Call the function for every existing word
    matchGivenWordWithExistingSynonyms({
      givenWord,
      existingWord: nodeWord,
      synonyms,
    });
  });
}
