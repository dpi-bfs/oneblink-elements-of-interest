import {OutputFormat} from './projectTypes'
import {writeElementsOfInterestToJsonFiles} from './getOneBlinkElementsOfInterestFromDefinition'

/**********  Config *****************************************************/ 

// Add a DEV formID if not yet existing
enum FormIdEnum {
  PartheniumWeedCarriersRecordOfMovement = 19049,
  PartheniumWeedCarriersInspection = 19289,
  PartheniumWeedCarriersBiosecurityCertificatePaymentAfterBorderCrossing = 23357,
  PartheniumWeedCarriersNswDestinationsNotification = 23378
} 

// Set one or more FormIdEnums
// const formIds: number[] = [
//   FormIdEnum.PartheniumWeedCarriersRecordOfMovement,  
//   FormIdEnum.PartheniumWeedCarriersInspection,
//   FormIdEnum.PartheniumWeedCarriersBiosecurityCertificatePaymentAfterBorderCrossing,
//   FormIdEnum.PartheniumWeedCarriersNswDestinationsNotification
// ]
const formIds: number[] = [
  FormIdEnum.PartheniumWeedCarriersInspection,
  FormIdEnum.PartheniumWeedCarriersNswDestinationsNotification
]

// Set to `true` to write to file, `false` to log to console
const outputToFile = true;

// Set the desired output format here
const outputFormat: OutputFormat = OutputFormat.AsKeyPair;
/*************************************************************************/

writeElementsOfInterestToJsonFiles(formIds, outputFormat, outputToFile)