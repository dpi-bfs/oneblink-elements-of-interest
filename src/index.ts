import {OutputFormat} from './projectTypes'
import {writeElementsOfInterestToJson} from './getOneBlinkElementsOfInterestFromDefinition'

/**********  Config ****************************************************************/
import formDefinition from '../formDefinitions/RecordOfMovementDefinition.json';

// Set to `true` to write to file, `false` to log to console
const outputToFile = true;

// Set the desired output format here
const outputFormat: OutputFormat = OutputFormat.AsKeyPair;
/*************************************************************************************/

writeElementsOfInterestToJson(formDefinition,outputFormat,outputToFile)