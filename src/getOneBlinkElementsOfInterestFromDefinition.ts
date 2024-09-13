/**********  Config ****************************************************************/
import formDefinition from '../formDefinitions/RecordOfMovementDefinition.json';

// Set to `true` to write to file, `false` to log to console
const outputToFile = true;

// Define the enum for output format
enum OutputFormat {
  AsKeyPair,
  WithChildObject,
}

// Set the desired output format here
const outputFormat: OutputFormat = OutputFormat.AsKeyPair;
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
      } else if (outputFormat === OutputFormat.AsKeyPair) {
        result[key] = `[${element.type}] ${element.label}`;
      } else if (outputFormat === OutputFormat.WithChildObject) {
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
  const formatSuffix = outputFormat === OutputFormat.AsKeyPair ? 'AsKeyPair' : 'WithChildObject';
  // const datetime = moment().format('YYYYMMDD-HHmm');
  // return `${formattedName}-${datetime}.json`;
  return `${formattedName}-ElementsOfInterest-${formatSuffix}.json`;
}

function writeToFile(processedData: { [key: string]: any }) {
  const filePath = path.join(__dirname, '..\\out', getOutputFileName());
  fs.writeFileSync(filePath, JSON.stringify(processedData, null, 2), 'utf8');
  console.log(`File saved to ${filePath}`);
}

const processedData = extractElements(formDefinition.elements);

if (outputToFile) {
  writeToFile(processedData);
} else {
  console.log(JSON.stringify(processedData, null, 2));
}
