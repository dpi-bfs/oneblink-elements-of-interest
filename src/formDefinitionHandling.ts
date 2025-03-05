import OneBlink from '@oneblink/sdk'
import OneBlinkTypes from '@oneblink/types'
import BlinkMrc from '.blinkmrc.json'

// Initialize the OneBlink SDK Forms client
const formsSDK = new OneBlink.Forms({
  accessKey: BlinkMrc.server.variables.FORMS_ACCESS_KEY!,
  secretKey: BlinkMrc.server.variables.FORMS_SECRET_KEY!,
});

export async function fetchFormDefinition(formID: number) {
  try {
    const formDefinition: OneBlinkTypes.FormTypes.Form = await formsSDK.getForm(formID);
    return formDefinition;
  } catch (error) {
    console.error('Error fetching form definition:', error);
    throw error;
  }
}