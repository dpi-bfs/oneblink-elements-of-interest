/*
 Given a OneBlink Form definition return a JSON file that shows each element, as children of a parent page.

 * Excludes `__` prefixed elements
 * Shows repeatable sets and their children as with "[]"
**/

import fs from 'fs';
import path from 'path';
import formDefinition from './RecordOfMovementDefinition.json';
import moment from 'moment';

// Function to process the elements and build the output JSON
function processElements(elements) {
    const result = {};

    function processElement(element, parentKey = '') {
        if (!element || element.name.startsWith('__')) return;

        const key = parentKey ? `${parentKey}.${element.name}` : element.name;

        if (element.type === 'repeatableSet') {
            result[key] = element.label;

            if (element.elements) {
                element.elements.forEach(childElement => {
                    processElement(childElement, `${key}[]`);
                });
            }
        } else if (element.elements && element.elements.length > 0) {
            result[key] = element.label;

            element.elements.forEach(childElement => {
                processElement(childElement, key);
            });
        } else {
            result[key] = element.label;
        }
    }

    formDefinition.elements.forEach(page => {
        if (page.type === 'page' && page.elements) {
            page.elements.forEach(element => processElement(element));
        }
    });

    return result;
}

// Generate the output file name
const name = formDefinition.name.replace(/\s+/g, ''); // Remove spaces
const formattedName = name.charAt(0).toUpperCase() + name.slice(1); // PascalCase
const datetime = moment().format('YYYYMMDD-HHmm');
const fileName = `${formattedName}-${datetime}.json`;
const filePath = path.join(__dirname, 'out', fileName);

// Flag to choose between file and console output
const outputToFile = true; // Set to `true` to write to file, `false` to log to console

// Process the elements and output
const processedData = processElements(formDefinition.elements);

if (outputToFile) {
    // Ensure the 'out' directory exists
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    // Write to file
    fs.writeFileSync(filePath, JSON.stringify(processedData, null, 2), 'utf8');
    console.log(`File saved to ${filePath}`);
} else {
    // Log to console
    console.log(JSON.stringify(processedData, null, 2));
}
