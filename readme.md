
 # OneBlink Elements of Interest
 
 ## Description

Given a set of OneBlink Form Ids write to json files that shows each element of interest, per form. 

* Saves a simple json "element of interest" file for each form.

* Excludes:
  - `__` prefixed elements
  - Info elements
  - Heading elements

* Shows repeatable sets and their children with "[]"

* Groups elements in their pages.

* In (recommended) `OutputFormat.AsKeyPair` where: the key is the (technical) element name, and the value is the type in brackets []; followed by the (user facing) element label. E.g. 
    
      "ExpectedInspectionDate": "[date] Expected inspection date",
  
    - Example file: <a href="./flotsam/exampleOutput/PartheniumWeedCarriers-RecordOfMovement-ElementsOfInterest-AsKeyPair.json">flotsam/exampleOutput/PartheniumWeedCarriers-RecordOfMovement-ElementsOfInterest-AsKeyPair.json</a>

* In `OutputFormat.WithChildObject` where the value is an object showing type and label separately. E.g.

      "ExpectedInspectionDate": {
        "label": "Expected inspection date",
        "type": "date"
      }

    - Example file: <a href="./flotsam/exampleOutput/PartheniumWeedCarriers-RecordOfMovement-ElementsOfInterest-WithChildObject.json">/flotsam/exampleOutput/PartheniumWeedCarriers-RecordOfMovement-ElementsOfInterest-WithChildObject.json</a>

## Why is this useful?

The following use cases

  1. The main use case is when designing a database to receive data from one or more (possibly complex) oneblink forms. You want to know all the relevant fields to have in the database. 

      One would normally do this by scanning the console. But the "elements of interest" live in a sea of irrelevant elements (headings, sections, info elements, "__" prefixed technical elements); spread across multiple tabs. Easier to have a single text file with type information to cross check against an existing or developing database schema.

      You might be tempted to look at submission output of a form for this work. But the problem with this is that elements are often conditionally shown. And so a particular submission might miss some elements because they where not shown.

  2. Another use case is when building (ironically) a paper based form that would feed a oneblink form. We do this in the Parthenium weed project in case our system is down. The paper form is a backup. In this case the paper form designer wants to know *all* the possible elements to show.

  3. When making changes to a project with an existing PROD database it is useful to compare the set of fields that are changed or added. We can achieve this by get a file of elements of interest for the OneBlink DEV V PROD forms. Then doing a text base comparison of the differences (e.g. Using Windiff or Visual Studio Codes built in text comparison commands). e.g. compare the following
      - \out\FireAntCarriers-RecordOfMovementDeclaration-18736-ElementsOfInterest-AsKeyPair.json
      - \out\FireAntCarriers-RecordOfMovementDeclaration-19723-ElementsOfInterest-AsKeyPair.json

      ![formDefinitionComparisonAcrossEnvironments.png](docs\formDefinitionComparisonAcrossEnvironments.png)

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


## Usage

### General Setup

* Install node.js.

* Download code and execute ...

      npm install

* Create in your root a .blinkmrc.json as follows; supplying the correct keys

      {
        "server": {
          "project": "oneblink-elements-of-interest",
          "timeout": 120,
          "variables": {
            "FORMS_ACCESS_KEY": "99999999999999",
            "FORMS_SECRET_KEY": "111111111111111111"
          }
        }
      }

### Form/Project Setup

* Note the form ids from a url. E.g. 19049 in https://nswfoodauthority-dpi-forms-dev.cdn.oneblink.io/forms/19049

* In  .\src\index.ts goto the config section and set according the comments.

### Update the code

* Update packages
  
      npx npm-check-updates --upgrade
      npm install

### Execute it

* Turn off checkpoint harmony. Otherwise you may get "SELF_SIGNED_CERT_IN_CHAIN" errors.

* Execute ....
    
      npm start
      
      // or
      
      npx tsx .\src\index.ts

* Observe in folder \out\ the desired files. E.g.

  + PartheniumWeedCarriers-Inspection-ElementsOfInterest-AsKeyPair.json
  + PartheniumWeedCarriers-RecordOfMovement-ElementsOfInterest-AsKeyPair.json


