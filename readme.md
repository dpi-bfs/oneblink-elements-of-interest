
 ## Description

Given a OneBlink Form definition file return a file that shows each element of interest. 

* Returns a simple json "element of interest" file.

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

## Usage

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

