import {OutputFormat} from './projectTypes'
import {writeElementsOfInterestToJson} from './getOneBlinkElementsOfInterestFromDefinition'

/**********  Config ****************************************************************/

const formId = 19049

// Set to `true` to write to file, `false` to log to console
const outputToFile = true;

// Set the desired output format here
const outputFormat: OutputFormat = OutputFormat.AsKeyPair;
/*************************************************************************************/

writeElementsOfInterestToJson(formId, outputFormat,outputToFile)