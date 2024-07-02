import { $UpwithCrowd_BackerService_Individuals_CreateIndividualDto } from "@ayasofyazilim/saas/BackerService";
import { ZodObjectOrWrapped } from "node_modules/@repo/ayasofyazilim-ui/src/organisms/auto-form/utils";
import { createZodObject } from "src/utils";
import { ZodAny, ZodAnyDef, ZodObject, z } from "zod";

const $UpwithCrowd_BackerService_Organizations_CreateOrganizationDto = {
    type: 'object',
    properties: {
        extraProperties: {
            type: 'object',
            additionalProperties: {},
            nullable: true,
            readOnly: true
        },
        name: {
            type: 'string',
            nullable: true
        },
        taxpayerId: {
            type: 'string',
            nullable: true
        },
        legalStatusCode: {
            type: 'string',
            nullable: true
        },
        customerNumber: {
            type: 'string',
            nullable: true
        },
        contactInformation: {
            type: 'object',
            properties: {
                extraProperties: {
                    type: 'object',
                    additionalProperties: {},
                    nullable: true,
                    readOnly: true
                },
                telephones: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            extraProperties: {
                                type: 'object',
                                additionalProperties: {},
                                nullable: true,
                                readOnly: true
                            },
                            areaCode: {
                                type: 'string',
                                nullable: true
                            },
                            localNumber: {
                                type: 'string',
                                nullable: true
                            },
                            ituCountryCode: {
                                type: 'string',
                                nullable: true
                            }
                        },
                        additionalProperties: false
                    },
                    nullable: true
                },
                addresses: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            extraProperties: {
                                type: 'object',
                                additionalProperties: {},
                                nullable: true,
                                readOnly: true
                            },
                            typeCode: {
                                enum: [0, 1],
                                type: 'integer',
                                format: 'int32'
                            },
                            addressLine: {
                                type: 'string',
                                nullable: true
                            },
                            city: {
                                type: 'string',
                                nullable: true
                            },
                            terriority: {
                                type: 'string',
                                nullable: true
                            },
                            postalCode: {
                                type: 'string',
                                nullable: true
                            },
                            country: {
                                type: 'string',
                                nullable: true
                            },
                            fullAddress: {
                                type: 'string',
                                nullable: true
                            }
                        },
                        additionalProperties: false
                    },
                    nullable: true
                },
                emails: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            extraProperties: {
                                type: 'object',
                                additionalProperties: {},
                                nullable: true,
                                readOnly: true
                            },
                            emailAddress: {
                                type: 'string',
                                nullable: true
                            }
                        },
                        additionalProperties: false
                    },
                    nullable: true
                }
            },
            additionalProperties: false
        }
    },
    additionalProperties: false
} as const;

const createBacker = $UpwithCrowd_BackerService_Organizations_CreateOrganizationDto;
const createIndividual = $UpwithCrowd_BackerService_Individuals_CreateIndividualDto;
const backerZod = createZodObject(createBacker, Object.keys(createBacker.properties));
const IndividualZod = createZodObject(createIndividual, Object.keys(createBacker.properties));
export const formSchema: Record<string, ZodObjectOrWrapped> = {
    admin: backerZod,
    user: z.object({
        name: z.string(),
        surname: z.string(),
        phoneNumber: z.string(),
        address: z.string(),
        email: z.string().email(),
    }),
    entreperneur: IndividualZod,
    investor: backerZod,
};