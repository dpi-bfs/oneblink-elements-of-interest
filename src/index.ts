import {OutputFormat} from './projectTypes'
import {writeElementsOfInterestToJsonFiles} from './getOneBlinkElementsOfInterestFromDefinition'

/**********  Config *****************************************************/ 

// Add a formID if not yet existing
enum FormIdEnum {
  PartheniumWeedCarriersRecordOfMovementDev = 19049,
  PartheniumWeedCarriersInspectionDev = 19289,
  PartheniumWeedCarriersBiosecurityCertificatePaymentAfterBorderCrossingDev  = 23357,
  PartheniumWeedCarriersNswDestinationsNotificationDev  = 23378,
  FireAntCarriersRecordOfMovementDev = 18736,
  FireAntCarriersRecordOfMovementProd = 19723,
  CtoSubmitATreatmentRecord = 23676,
  CtoSubmitAnExaminationRecord = 24022,
  DesignSpiker02Dev = 20913
} 

// Set one or more FormIdEnums
// const formIds: number[] = [
//   FormIdEnum.PartheniumWeedCarriersRecordOfMovementDev ,  
//   FormIdEnum.PartheniumWeedCarriersInspectionDev ,
//   FormIdEnum.PartheniumWeedCarriersBiosecurityCertificatePaymentAfterBorderCrossingDev ,
//   FormIdEnum.PartheniumWeedCarriersNswDestinationsNotificationDev 
// ]
// const formIds: number[] = [
//   FormIdEnum.PartheniumWeedCarriersInspectionDev ,
//   FormIdEnum.PartheniumWeedCarriersNswDestinationsNotificationDev 
// ]
// const formIds: number[] = [
//   FormIdEnum.FireAntCarriersRecordOfMovementDev ,
//   FormIdEnum.FireAntCarriersRecordOfMovementProd 
// ]
const formIds: number[] = [
  FormIdEnum.DesignSpiker02Dev
]

// Set to `true` to write to file, `false` to log to console
const outputToFile = true;

// Set the desired output format here
const outputFormat: OutputFormat = OutputFormat.AsKeyPairWithElementID;
/*************************************************************************/

writeElementsOfInterestToJsonFiles(formIds, outputFormat, outputToFile)