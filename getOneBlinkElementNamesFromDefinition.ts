/*
 Given a OneBlink Form definition return a JSON file that shows each element, as children of a parent page.

 * Excludes `__` prefixed elements
 * Shows repeatable sets and their children as with "[]"
**/

import formDefinition from './RecordOfMovementDefinition.json';

function extractElements(elements, prefix = '') {
  const result = {};

  for (const element of elements) {
    if (element.name && !element.name.startsWith('__')) {
      if (element.type === 'repeatableSet') {
        result[`${prefix}${element.name}[]`] = element.label;
        // Process child elements with prefix
        if (element.elements) {
          result[`${prefix}${element.name}[]`] = extractElements(element.elements, `${prefix}${element.name}[]` + '.');
        }
      } else {
        result[`${prefix}${element.name}`] = element.label;
      }
    }

    // Recursively process nested elements
    if (element.elements) {
      const nestedElements = extractElements(element.elements, prefix);
      if (Object.keys(nestedElements).length > 0) {
        if (element.type === 'page') {
          result[element.label] = nestedElements;
        } else {
          Object.assign(result, nestedElements);
        }
      }
    }
  }

  return result;
}

// Extract elements from the top-level `elements` array
const extractedElements = extractElements(formDefinition.elements);

// Convert result to JSON format
console.log(JSON.stringify(extractedElements, null, 2));

