"use server";

import { BackerServiceClient } from "@ayasofyazilim/saas/BackerService";
import { getBackerServiceClient } from "src/lib";

function populateCustomFormData(formdata: any) {
  const customFormData = {
      entityInformationTypes: [
        {
          organizations: [
            {
              name: formdata.companyName,
              taxpayerId: formdata.taxpayerId,
              legalStatusCode: formdata.legalStatusCode,
              customerNumber: formdata.customerNumber,
              contactInformation: {
                telephones: [
                  {...formdata.telephone}
                ],
                addresses: [
                  {...formdata.address}
                ],
                emails: [
                  { emailAddress: formdata.emailAddress}
                ],
              },

            },
          ],
        },
      ],
    }
  return customFormData;
}

export async function postBacker(formdata: any) {
  console.log("postBacker", formdata);
  const client = await getBackerServiceClient();
  let result;
  try {
    result = await client.backer.postApiBackerServiceBackersWithComponents({
      requestBody: populateCustomFormData(formdata),
    });
  } catch (e){
    console.error(e);
  }
  console.log("postBacker API Result, ", result);
  return result;
}

export async function getBackers() {
  const client = await getBackerServiceClient();
  const result = await client.backer.getApiBackerServiceBackers({
    maxResultCount: 1000,
  });
  const itemsIds = result.items?.map((item) => item.id) || [];
  const returnArray = [];
  for (const id of itemsIds) {
    const item = await client.backer.getApiBackerServiceBackersDetailById({
      id: id || "",
    });
    const organization = item.entityInformations?.[0]?.organizations?.[0];
    if (!organization) continue;
    returnArray.push({
      name: organization?.name,
      legalStatusCode: organization?.legalStatusCode,
      taxpayerId: organization?.taxpayerId,
      backerId: id,
    });
  }
  return returnArray;
}

export async function deleteBacker(backerId: string) {
  const client = await getBackerServiceClient();
  const result = await client.backer.deleteApiBackerServiceBackers({
    id: backerId,
  });
  return result;
}

export async function putBacker(backerId: string, formdata: any) {
  console.log("putBacker", backerId, formdata);
  const client: BackerServiceClient = await getBackerServiceClient();
  const result = await client.backer.putApiBackerServiceBackers({
    id: backerId,
    requestBody: populateCustomFormData(formdata),
  });
  return result;
}

export async function getBacker(profileId: string) {
  const client = await getBackerServiceClient();
  const result = await client.backer.getApiBackerServiceBackersDetailById({
    id: profileId,
  });
  const organization = result.entityInformations?.[0]?.organizations?.[0];
    return  {
    companyName: organization?.name,
    legalStatusCode: organization?.legalStatusCode,
    taxpayerId: organization?.taxpayerId,
    customerNumber: "not available by backend API",
    emailAddress: organization?.contactInformation?.emails?.[0]?.emailAddress,
    telephone: organization?.contactInformation?.telephones?.[0],
    address: organization?.contactInformation?.addresses?.[0],
  } || {};
}

export async function getBackersIndividuals() {
  const client = await getBackerServiceClient();
  const result = await client.backer.getApiBackerServiceBackers({
    maxResultCount: 1000,
  });
  const itemsIds = result.items?.map((item) => item.id) || [];
  const returnArray = [];
  for (const id of itemsIds) {
    const item = await client.backer.getApiBackerServiceBackersDetailById({
      id: id || "",
    });
    const individual = item.entityInformations?.[0]?.individuals?.[0];
    if (!individual) continue;
    returnArray.push({
      name: individual?.name?.name,
      legalStatusCode: individual?.name?.salutation,
      taxpayerId: individual?.name?.id,
      backerId: id,
    });
  }
  return returnArray;
}