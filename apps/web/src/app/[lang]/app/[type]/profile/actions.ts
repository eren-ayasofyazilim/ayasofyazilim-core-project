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
                                "name": formdata.name,
                                "taxpayerId": formdata.taxpayerId,
                                "legalStatusCode": formdata.legalStatusCode,
                                "customerNumber": "123123",
                                "contactInformation": {
                                    "startDate": "2024-06-26T10:13:07.146Z",
                                    "endDate": "2024-06-26T10:13:07.147Z",
                                    "telephones": [
                                        {
                                            "areaCode": "1231",
                                            "localNumber": "123",
                                            "ituCountryCode": "123123"
                                        }
                                    ],
                                    "addresses": [
                                        {
                                            "typeCode": 0,
                                            "addressLine": "string",
                                            "city": "string",
                                            "terriority": "string",
                                            "postalCode": "string",
                                            "country": "string",
                                            "fullAddress": "string"
                                        }
                                    ],
                                    "emails": [
                                        {
                                            "emailAddress": "string"
                                        }
                                    ]
                                }
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