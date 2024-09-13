
 ## Description

Given a OneBlink Form Id return a file that shows each element of interest. 

* Saves a simple json "element of interest" file.

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
    }


## Usage

* Note the form id from a url. E.g. 19049 in https://nswfoodauthority-dpi-forms-dev.cdn.oneblink.io/forms/19049

* In  .\src\index.ts goto config section:
  - Set formId
  - Set const outputToFile
  - Set outputFormat

* Execute 
    
    npm start
    
    // or
    
    npx tsx .\src\index.ts


## Technical notes

* Loads into memory a OneBlink form definition file, given a form id.

* Form ids are unique to each environments for the same form. E.g.
  - 19227. TEST Parthenium Weed Carriers - Record of Movement https://forms-test.bfs.dpi.nsw.gov.au/forms/19227
  - 19564. PROD Parthenium Weed Carriers - Record of Movement https://forms.bfs.dpi.nsw.gov.au/forms/19564

* An example OneBlink form definition file is at flotsam\formDefinitions\RecordOfMovementDefinition.json

* To view a OneBlink Form file definition via the browser:
  - Load Form in Firefox Browser with Dev Console F12 open
  - Network Tab > XHR filter
  - Look for something like '19049?injectForms=true"' (The number is the form id)
  - View or get response
    + Click on that line > Right hand pane > Response Tab; or
    + Right click on that line > Copy Value > Copy Response