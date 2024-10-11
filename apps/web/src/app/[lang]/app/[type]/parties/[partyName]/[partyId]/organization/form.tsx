"use client";

import type { UniRefund_CRMService_Organizations_OrganizationDto } from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useRouter } from "next/navigation";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { PartyNameType } from "../../../types";
import type { PutOrganization } from "../types";
import { editSchemasOfParties } from "../update-data";
import { handleUpdateSubmit } from "../utils";

function OrganizationForm({
  languageData,
  partyName,
  partyId,
  organizationId,
  organizationData,
}: {
  languageData: CRMServiceServiceResource;
  partyName: PartyNameType;
  partyId: string;
  organizationId: string;
  organizationData: UniRefund_CRMService_Organizations_OrganizationDto;
}) {
  const router = useRouter();
  const { organizationSchema, organizationSchemaSubPositions } =
    editSchemasOfParties[partyName];

  //hide branchId & parent because its headquarter
  const _organizationSchema = createZodObject(
    organizationSchema,
    organizationSchemaSubPositions,
  );

  return (
    <SectionLayoutContent sectionId="organization">
      <AutoForm
        formClassName="pb-40"
        formSchema={_organizationSchema}
        onSubmit={(values) => {
          void handleUpdateSubmit(
            partyName,
            {
              action: "organization",
              data: {
                requestBody: values as PutOrganization["data"]["requestBody"],
                id: partyId,
                organizationId: organizationId || "",
              },
            },
            router,
          );
        }}
        values={organizationData}
      >
        <AutoFormSubmit className="float-right">
          {languageData.Save}
        </AutoFormSubmit>
      </AutoForm>
    </SectionLayoutContent>
  );
}

export default OrganizationForm;
