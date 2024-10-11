"use client";

import type {
  UniRefund_CRMService_Individuals_IndividualDto,
  UniRefund_CRMService_Organizations_OrganizationDto,
} from "@ayasofyazilim/saas/CRMService";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { emailSchema } from "@repo/ui/utils/table/form-schemas";
import { useRouter } from "next/navigation";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { PartyNameType } from "../../../types";
import type { PutEmail } from "../types";
import { handleUpdateSubmit } from "../utils";

function Email({
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

  const emailValues = organizationData?.contactInformations?.[0]?.emails?.[0];
  return (
    <SectionLayoutContent sectionId="email">
      <AutoForm
        fieldConfig={{
          emailAddress: {
            inputProps: {
              type: "email",
            },
          },
        }}
        formClassName="pb-40 "
        formSchema={emailSchema}
        onSubmit={(values) => {
          void handleUpdateSubmit(
            partyName,
            {
              action: "email",
              data: {
                requestBody: values as PutEmail["data"]["requestBody"],
                id: partyId,
                emailId: emailValues?.id || "",
              },
            },
            router,
          );
        }}
        values={emailValues}
      >
        <AutoFormSubmit className="float-right">
          {languageData.Save}
        </AutoFormSubmit>
      </AutoForm>
    </SectionLayoutContent>
  );
}

export default Email;
