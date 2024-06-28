import { $UpwithCrowd_BackerService_Individuals_CreateIndividualDto, $UpwithCrowd_BackerService_Organizations_CreateOrganizationDto } from "@ayasofyazilim/saas/BackerService";
import { createZodObject } from "src/utils";
import { z } from "zod";

const createBacker = $UpwithCrowd_BackerService_Organizations_CreateOrganizationDto;
const createIndividual = $UpwithCrowd_BackerService_Individuals_CreateIndividualDto;
const backerZod = createZodObject(createBacker, Object.keys(createBacker.properties));
const IndividualZod = createZodObject(createIndividual, Object.keys(createBacker.properties));
export const formSchema = {
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