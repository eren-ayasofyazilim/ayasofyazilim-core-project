'use server'

import { revalidatePath } from "next/cache";
import { getBackerServiceClient } from "src/lib";


export async function postBacker(formdata: any) {
    const client = await getBackerServiceClient();
    const result = await client.backer.postApiBackerServiceBackersWithComponents(
        {
            requestBody: {
                "entityInformationTypes": [
                    {
                        "organizations": [
                            {
                                ...formdata
                            }
                        ]
                    }
                ]
            }
        }
    );
    return result;
}

export async function getBackers() {
    const client = await getBackerServiceClient();
    const result = await client.backer.getApiBackerServiceBackers({
        maxResultCount: 1000
    });
    const itemsIds = result.items?.map((item) => item.id) || [];
    const returnArray = [];
    for (const id of itemsIds) {
        const item = await client.backer.getApiBackerServiceBackersDetailById({
            id: id || ""
        });
        const organization = item.entityInformations?.[0]?.organizations?.[0]
        returnArray.push({
            name: organization?.name,
            legalStatusCode: organization?.legalStatusCode,
            taxpayerId: organization?.taxpayerId
        })
    }
    return returnArray;
}