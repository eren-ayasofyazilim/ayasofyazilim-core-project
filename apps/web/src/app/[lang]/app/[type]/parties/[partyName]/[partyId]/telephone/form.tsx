"use client";

import type {
  UniRefund_CRMService_Individuals_IndividualDto,
  UniRefund_CRMService_Organizations_OrganizationDto,
} from "@ayasofyazilim/saas/CRMService";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { telephoneSchema } from "@repo/ui/utils/table/form-schemas";
import { useRouter } from "next/navigation";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { PartyNameType } from "../../../types";
import type { PutTelephone } from "../types";
import { handleUpdateSubmit } from "../utils";

function Telephone({
  languageData,
  partyName,
  partyId,
  organizationData,
}: {
  languageData: CRMServiceServiceResource;
  partyName: PartyNameType;
  partyId: string;
  organizationData:
    | UniRefund_CRMService_Organizations_OrganizationDto
    | UniRefund_CRMService_Individuals_IndividualDto
    | undefined;
}) {
  const router = useRouter();

  const telephoneData =
    organizationData?.contactInformations?.[0]?.telephones?.[0];
  const telephoneValues = {
    localNumber:
      (telephoneData?.ituCountryCode || "+90") +
      (telephoneData?.areaCode || "") +
      (telephoneData?.localNumber || ""),
    primaryFlag: telephoneData?.primaryFlag,
    typeCode: telephoneData?.typeCode,
  };
  return (
    <SectionLayoutContent sectionId="telephone">
      <AutoForm
        fieldConfig={{
          localNumber: {
            fieldType: "phone",
            displayName: "Telephone Number",
            inputProps: {
              showLabel: true,
            },
          },
        }}
        formClassName="pb-40 "
        formSchema={telephoneSchema}
        onSubmit={(values) => {
          const isValid = isPhoneValid(values.localNumber as string);
          if (!isValid) {
            return;
          }
          const phoneData = splitPhone(values.localNumber as string);
          void handleUpdateSubmit(
            partyName,
            {
              action: "telephone",
              data: {
                requestBody: {
                  ...values,
                  ...phoneData,
                } as PutTelephone["data"]["requestBody"],
                id: partyId,
                telephoneId: telephoneData?.id || "",
              },
            },
            router,
          );
        }}
        values={telephoneValues}
      >
        <AutoFormSubmit className="float-right">
          {languageData.Save}
        </AutoFormSubmit>
      </AutoForm>
    </SectionLayoutContent>
  );
}

export default Telephone;
