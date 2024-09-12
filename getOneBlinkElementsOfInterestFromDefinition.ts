/*
  Description:
    Given a OneBlink Form definition return a JSON file that shows each element, as children of a parent page. 


    * Excludes:
      - `__` prefixed elements
      - Info elements

    * Shows repeatable sets and their children with "[]"
    * Groups elements in their pages.
    * In key/value format where key is the (technical) element name and the value is the (user facing) element label. E.g. 
        "ExpectedInspectionDate": "Expected inspection date",

  Usage:
    * Download OneBlink Form file definition:
      - Load Form in Firefox Browser with Dev Console F12 open
      - Network Tab > XHR filter
      - Look for something like '19049?injectForms=true"' (The number is the form id)
      - View or get response
        + Click on that line > Right hand pane > Response Tab; or
        + Right click on that line > Copy Value > Copy Response
    * Copy response to file E.g. ./formDefinitions/RecordOfMovementDefinition.json
    * In this code 
      - Update import formDefinition
      - Set const outputToFile
    * Execute 

      npx tsx .\getOneBlinkElementsOfInterestFromDefinition.ts
**/

import formDefinition from './formDefinitions/RecordOfMovementDefinition.json';

// Set to `true` to write to file, `false` to log to console
const outputToFile = true;

import fs from 'fs';
import path from 'path';
import moment from 'moment';

function extractElements(elements, prefix = '') {
  const result = {};

  for (const element of elements) {
    // An element type 'html' is an info element
    if (element.name 
        && !element.name.startsWith('__') 
        && element.type !== 'html'
        && element.type !== 'heading'
      ) {
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


function toPascalCase(input: string): string {
  return input
    .split(/\s+/)                     // Split the string by whitespace
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join('');                        // Join the words together
}

function getOutputFileName() {
  const formattedName = toPascalCase(formDefinition.name)
  // const datetime = moment().format('YYYYMMDD-HHmm');
  // return `${formattedName}-${datetime}.json`;
  return `${formattedName}-ElementsOfInterest.json`;
}

function writeToFile(processedData) {
  const filePath = path.join(__dirname, 'out', getOutputFileName());
  fs.writeFileSync(filePath, JSON.stringify(processedData, null, 2), 'utf8');
  console.log(`File saved to ${filePath}`);
}

const processedData = extractElements(formDefinition.elements);

if (outputToFile) {
  writeToFile(processedData)
} else {
  console.log(JSON.stringify(processedData, null, 2));
}
