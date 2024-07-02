"use server";

import { BackerServiceClient } from "@ayasofyazilim/saas/BackerService";
import { revalidatePath } from "next/cache";
import { getBackerServiceClient } from "src/lib";

export async function postBacker(formdata: any) {
  const client = await getBackerServiceClient();
  const result = await client.backer.postApiBackerServiceBackersWithComponents({
    requestBody: {
      entityInformationTypes: [
        {
          organizations: [
            {
              ...formdata,
            },
          ],
        },
      ],
    },
  });
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
  const client: BackerServiceClient = await getBackerServiceClient();
  const result = await client.backer.putApiBackerServiceBackers({
    id: backerId,
    requestBody: {
      entityInformationTypes: [
        {
          organizations: [
            {
              ...formdata,
            },
          ],
        },
      ],
    },
  });
  return result;
}

export async function getBacker(profileId: string) {
  const client = await getBackerServiceClient();
  const result = await client.backer.getApiBackerServiceBackersDetailById({
    id: profileId,
  });
  return result.entityInformations?.[0]?.organizations?.[0] || {};
}
