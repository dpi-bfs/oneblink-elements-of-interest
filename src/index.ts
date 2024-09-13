import {OutputFormat} from './projectTypes'
import {writeElementsOfInterestToJsonFiles} from './getOneBlinkElementsOfInterestFromDefinition'

/**********  Config *****************************************************/ 

// Add a DEV formID if not yet existing
enum FormIdEnum {
  PartheniumWeedCarriersRecordOfMovement = 19049,
  PartheniumWeedCarriersInspection = 19289
} 

// Set one or more FormIdEnums
const formIds: number[] = [
  FormIdEnum.PartheniumWeedCarriersRecordOfMovement,  
  FormIdEnum.PartheniumWeedCarriersInspection
]

// Set to `true` to write to file, `false` to log to console
const outputToFile = true;

// Set the desired output format here
const outputFormat: OutputFormat = OutputFormat.AsKeyPair;
/*************************************************************************/

writeElementsOfInterestToJsonFiles(formIds, outputFormat,outputToFile)