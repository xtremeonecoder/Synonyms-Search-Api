/**
 * Synonyms Search Tool
 *
 * @category   Application_Backend
 * @package    synonym-search-backend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

export interface ISynonym {
  word: string;
  synonyms: Set<string>;
}

export interface IMatchGivenSynonymWithExistingWords {
  givenWord: string;
  givenSynonym: string;
  synonymsSet: Set<string>;
  synonyms: Map<string, ISynonym>;
}

export interface IMatchGivenWordWithExistingSynonyms {
  givenWord: string;
  existingWord: ISynonym;
  synonyms: Map<string, ISynonym>;
}

export interface IApplyTransitiveRule {
  givenWord: string;
  wordExists?: boolean;
  synonymsToAdd: string[];
  synonymsSet: Set<string>;
  synonyms: Map<string, ISynonym>;
}
