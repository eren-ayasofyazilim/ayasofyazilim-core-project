"use client";
import AutoForm, { AutoFormSubmit } from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { createZodObject } from "src/utils";
import { z } from "zod";
import { $UpwithCrowd_BackerService_Organizations_CreateOrganizationDto, $UpwithCrowd_BackerService_Individuals_CreateIndividualDto } from "@ayasofyazilim/saas/BackerService";
import { postBacker } from "../actions";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";

export default function Page({
    params,
}: {
    params: { lang: string; type: string };
}) {
    const type = params.type;
    const createBacker = $UpwithCrowd_BackerService_Organizations_CreateOrganizationDto;
    const createIndividual = $UpwithCrowd_BackerService_Individuals_CreateIndividualDto;
    const backerZod = createZodObject(createBacker, Object.keys(createBacker.properties));
    const IndividualZod = createZodObject(createIndividual, Object.keys(createBacker.properties));
    const formSchema = {
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

    return (
        <ScrollArea>
            <div className="container flex flex-col m-4 max-h-[500px]">
                <div className="grid gap-4 py-4">
                    <AutoForm
                        formSchema={formSchema[type]}
                        onSubmit={(formData) => {
                            postBacker(formData);
                        }}
                    >
                        <AutoFormSubmit className="float-right">
                            <button>Save Changes</button>
                        </AutoFormSubmit>
                    </AutoForm>
                </div>
            </div>
        </ScrollArea>
    );
}
