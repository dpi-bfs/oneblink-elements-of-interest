/*
  Description:
    Given a OneBlink Form definition return a JSON file that shows each element, as children of a parent page. 

    * Excludes:
      - `__` prefixed elements
      - Info elements
      - Heading elements

    * Shows repeatable sets and their children with "[]"
    * Groups elements in their pages.
    * In ElementAsKeyPair format where
      - key is the (technical) element name, and
      - the value is the type in brackets []; followed by the (user facing) element label. 
      - E.g. 
        "ExpectedInspectionDate": "[date] Expected inspection date",

    * In ElementWithChildObject format where the value is an object showing type and label separately. E.g.
        "ExpectedInspectionDate": {
          "label": "Expected inspection date",
          "type": "date"
        },

  Usage:
    * Download OneBlink Form file definition:
      - Load Form in Firefox Browser with Dev Console F12 open
      - Network Tab > XHR filter
      - Look for something like '19049?injectForms=true"' (The number is the form id)
      - View or get response
        + Click on that line > Right hand pane > Response Tab; or
        + Right click on that line > Copy Value > Copy Response
    * Copy response to file E.g. ./formDefinitions/RecordOfMovementDefinition.json
    * In this code goto config section:
      - Update import formDefinition
      - Set const outputToFile
      - Set outputFormat
    * Execute 
        npx tsx .\getOneBlinkElementsOfInterestFromDefinition.ts

**/


/**********  Config ****************************************************************/
import formDefinition from './formDefinitions/RecordOfMovementDefinition.json';

// Set to `true` to write to file, `false` to log to console
const outputToFile = true;

// Define the enum for output format
enum OutputFormat {
  ElementAsKeyPair,
  ElementWithChildObject,
}

// Set the desired output format here
const outputFormat: OutputFormat = OutputFormat.ElementAsKeyPair;
/*************************************************************************************/

import fs from 'fs';
import path from 'path';
// import moment from 'moment';

function extractElements(elements: any[], prefix = ''): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  for (const element of elements) {
    // Exclude elements with '__' prefix, info elements (type 'html'), and heading elements
    if (element.name 
        && !element.name.startsWith('__') 
        && element.type !== 'html'
        && element.type !== 'heading'
      ) {
      const key = `${prefix}${element.name}${element.type === 'repeatableSet' ? '[]' : ''}`;

      if (element.type === 'repeatableSet' && element.elements) {
        result[key] = extractElements(element.elements, `${key}.`);
      } else if (outputFormat === OutputFormat.ElementAsKeyPair) {
        result[key] = `[${element.type}] ${element.label}`;
      } else if (outputFormat === OutputFormat.ElementWithChildObject) {
        result[key] = {
          label: element.label,
          type: element.type,
        };
      }
    }

    // Recursively process nested elements (like pages)
    if (element.elements && element.type !== 'repeatableSet') {
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
  const formattedName = toPascalCase(formDefinition.name);
  const formatSuffix = outputFormat === OutputFormat.ElementAsKeyPair ? 'ElementAsKeyPair' : 'ElementWithChildObject';
  // const datetime = moment().format('YYYYMMDD-HHmm');
  // return `${formattedName}-${datetime}.json`;
  return `${formattedName}-ElementsOfInterest-${formatSuffix}.json`;
}

function writeToFile(processedData: { [key: string]: any }) {
  const filePath = path.join(__dirname, 'out', getOutputFileName());
  fs.writeFileSync(filePath, JSON.stringify(processedData, null, 2), 'utf8');
  console.log(`File saved to ${filePath}`);
}

const processedData = extractElements(formDefinition.elements);

if (outputToFile) {
  writeToFile(processedData);
} else {
  console.log(JSON.stringify(processedData, null, 2));
}