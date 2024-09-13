import {OutputFormat} from './projectTypes'
import {writeElementsOfInterestToJsonFiles} from './getOneBlinkElementsOfInterestFromDefinition'

/**********  Config ****************************************************************/

const formIds: number[] = [19049]
// const formIds: number[] = [19049,  19289]

// Set to `true` to write to file, `false` to log to console
const outputToFile = true;

// Set the desired output format here
const outputFormat: OutputFormat = OutputFormat.AsKeyPair;
/*************************************************************************************/

writeElementsOfInterestToJsonFiles(formIds, outputFormat,outputToFile)