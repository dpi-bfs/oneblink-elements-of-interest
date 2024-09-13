import OneBlink from '@oneblink/sdk'
import OneBlinkTypes from '@oneblink/types'
import BlinkMrc from '.blinkmrc.json'

// Initialize the OneBlink SDK Forms client
const formsSDK = new OneBlink.Forms({
  accessKey: BlinkMrc.server.variables.FORMS_ACCESS_KEY!,
  secretKey: BlinkMrc.server.variables.FORMS_SECRET_KEY!,
});

async function fetchFormDefinition(formID: number) {
  try {
    const formDefinition: OneBlinkTypes.FormTypes.Form = await formsSDK.getForm(formID);
    return formDefinition;
  } catch (error) {
    console.error('Error fetching form definition:', error);
    throw error;
  }
}

async function main() {
  try {
    const formDefinition: OneBlinkTypes.FormTypes.Form  = await fetchFormDefinition(22969);
    console.log('Form Definition:', JSON.stringify(formDefinition, null, 2));

  } catch (error) {
    console.error('Failed to get form definition:', error);
  }
}

main()
