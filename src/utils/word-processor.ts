/**
 * Synonyms Search Tool
 *
 * @category   Application_Backend
 * @package    synonym-search-backend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

/**
 * Capitalizes the first character of each word in a string.
 *
 * @param {string} input - The input string to capitalize.
 * @returns {string} - The capitalized string.
 */
export function capitalizeWords(input: string): string {
  // First convert whole string to lower case
  input = input.toLowerCase().trim();

  // Use a regular expression to find the first
  // character of each word and convert it to uppercase
  return input.replace(/\b\w/g, (match) => match.toUpperCase());
}

/**
 * Capitalizes the first character of each item in an array of strings.
 *
 * @param {string[]} items - The array of strings to capitalize.
 * @returns {string[]} - An array of capitalized strings.
 */
export function capitalizeArrayItems(items: string[]): string[] {
  // Convert all the array items
  return items.map((item) => capitalizeWords(item));
}

/**
 * Recursively capitalizes the first character of each item in the values of an object.
 *
 * @param {T} items - The input object with string values to capitalize.
 * @returns {T} - An object with capitalized string values.
 */
export function capitalizeObjectItems<T>(items: T): T {
  // Define generic object type
  const result: Record<string, unknown> = {};

  // Conver all the items in the object
  Object.entries(items as object).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[key] = capitalizeWords(value);
    } else if (Array.isArray(value)) {
      result[key] = capitalizeArrayItems(value) as T;
    } else if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      result[key] = capitalizeObjectItems<T>(value);
    }
  });

  // Return converted object
  return result as T;
}

/**
 * Capitalizes inputs of varying types (string, array, or object) using the appropriate functions.
 *
 * @param {T} inputs - The input to capitalize, which can be a string, array, or object.
 * @returns {T} - The input with capitalized values.
 */
export function capitalizeInputs<T>(inputs: T): T {
  if (typeof inputs === 'string') {
    return capitalizeWords(inputs) as T;
  } else if (Array.isArray(inputs)) {
    return capitalizeArrayItems(inputs) as T;
  } else if (typeof inputs === 'object' && !Array.isArray(inputs) && inputs !== null) {
    return capitalizeObjectItems<T>(inputs);
  }

  return inputs;
}
