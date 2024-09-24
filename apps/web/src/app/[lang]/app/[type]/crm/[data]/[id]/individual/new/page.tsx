"use client";
import { toast } from "@/components/ui/sonner";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { postIndividual } from "../../../../actions/merchant";
import type { CreateIndividualDto } from "./data";
import {
  createIndividualScheme,
  formPositions,
  formSubPositions,
} from "./data";

export default function Page({
  params,
}: {
  params: {
    data: string;
    lang: string;
    id: string;
  };
}) {
  const router = useRouter();
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);

  const handleIndividualSave = async (formData: CreateIndividualDto) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      toast.error("Invalid phone number.");
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    const createformData = {
      name: formData.name,
      personalSummaries: [formData.personalSummary],
      contactInformations: [
        {
          telephones: [{ ...formData.telephone, primaryFlag: true }],
          emails: [{ ...formData.email, primaryFlag: true }],
          addresses: [{ ...formData.address, primaryFlag: true }],
        },
      ],
    };
    try {
      const response = await postIndividual({ requestBody: createformData });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.message || `Failed to add Individual`);
      } else {
        toast.success(`Individual added successfully`);
        router.push(getBaseLink(`/app/admin/crm/${params.data}/${params.id}`));
      }
    } catch (error) {
      toast.error(`An error occurred while saving the Individual`);
    }
  };

  return (
    <AutoForm
      className="grid-col-1 grid grid-rows-1 gap-2 space-y-0 lg:grid-cols-2 lg:grid-rows-2"
      fieldConfig={{
        address: {
          className: "row-span-2",
        },
        email: {
          emailAddress: {
            inputProps: {
              type: "email",
            },
          },
        },
        telephone: {
          localNumber: {
            fieldType: "phone",
            displayName: "Telephone Number",
            inputProps: {
              showLabel: true,
            },
          },
        },
      }}
      formClassName="pb-40 "
      formSchema={formSchemaByData()}
      onSubmit={(val) => {
        void handleIndividualSave(val as CreateIndividualDto);
      }}
    >
      <AutoFormSubmit className="float-right">
        {languageData.Save}
      </AutoFormSubmit>
    </AutoForm>
  );
}

function formSchemaByData() {
  return createZodObject(
    createIndividualScheme,
    formPositions,
    undefined,
    formSubPositions,
  );
}
