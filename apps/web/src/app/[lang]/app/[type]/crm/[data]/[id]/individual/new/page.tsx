"use client";
import { toast } from "@/components/ui/sonner";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import {
  $UniRefund_CRMService_NameCommonDatas_CreateNameCommonDataDto,
  $UniRefund_CRMService_PersonalSummaries_CreatePersonalSummaryDto,
} from "@ayasofyazilim/saas/CRMService";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { postIndividual } from "../../../../actions/merchant";
import { telephone, address, email } from "../../../../data";

export interface CreateIndividualDto {
  name: {
    salutation: string;
    name: string;
    suffix: string;
    mailingName: string;
    officialName: string;
  };
  personalSummary: {
    date: string;
    birthDate: string;
    ethnicity: string;
    maritalStatusCode: string;
    religiousAffiliationName: string;
    genderTypeCode: "MALE" | "FEMALE";
  };

  telephone: {
    areaCode: string;
    localNumber: string;
    ituCountryCode: string;
    primaryFlag: boolean;
    typeCode: "HOME" | "OFFICE" | "MOBILE" | "FAX";
  };
  address: {
    addressLine: string;
    city: string;
    terriority: string;
    postalCode: string;
    country: string;
    fullAddress: string;
    primaryFlag: boolean;
    typeCode: "HOME" | "OFFICE";
  };
  email: {
    emailAddress: string;
    primaryFlag: boolean;
    typeCode: "WORK" | "PERSONAL";
  };
}

const createIndividualScheme = {
  type: "object",
  properties: {
    name: $UniRefund_CRMService_NameCommonDatas_CreateNameCommonDataDto,
    personalSummary:
      $UniRefund_CRMService_PersonalSummaries_CreatePersonalSummaryDto,
    telephone,
    address,
    email,
  },
};

const formPositions = [
  "name",
  "telephone",
  "personalSummary",
  "address",
  "email",
];

const formSubPositions = {
  name: ["salutation", "name", "suffix", "mailingName", "officialName"],
  personalSummary: [
    "date",
    "birthDate",
    "ethnicity",
    "maritalStatusCode",
    "religiousAffiliationName",
    "genderTypeCode",
  ],
  telephone: ["localNumber", "typeCode"],
  address: [
    "country",
    "terriority",
    "city",
    "postalCode",
    "addressLine",
    "fullAddress",
    "typeCode",
  ],
  email: ["emailAddress", "typeCode"],
};

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
      formClassName="pb-4"
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
