"use client";

import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import type { UniRefund_TravellerService_Travellers_CreateTravellerDto } from "@ayasofyazilim/saas/TravellerService";
import { $UniRefund_TravellerService_Travellers_UpdateTravellerDto } from "@ayasofyazilim/saas/TravellerService";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import Link from "next/link";
import { isApiError } from "src/app/api/util";
import type { TravellerServiceResource } from "src/language-data/TravellerService";
import { createZodObject, getBaseLink } from "src/utils";
import { createTraveller } from "../actions";

const generalInformationSchema = createZodObject(
  $UniRefund_TravellerService_Travellers_UpdateTravellerDto,
  Object.keys(
    $UniRefund_TravellerService_Travellers_UpdateTravellerDto.properties,
  ),
);

export default function Form({
  travellerId,
  languageData,
}: {
  travellerId: string;
  languageData: TravellerServiceResource;
}) {
  return (
    <>
      <PageHeader
        LinkElement={Link}
        description={languageData.TravellerDescription}
        href={getBaseLink("app/admin/traveller")}
        title={`${languageData.TravellerDetail} - ${travellerId}`}
      />
      <Card className="h-full w-full flex-1 overflow-auto p-5">
        <AutoForm
          formClassName="border-0"
          formSchema={generalInformationSchema}
          onSubmit={(formdata) => {
            async function create() {
              try {
                const resposnse = await createTraveller(
                  formdata as UniRefund_TravellerService_Travellers_CreateTravellerDto,
                );
                if (resposnse.type === "success") {
                  toast.success("Traveller created successfully");
                } else {
                  toast.error(`${resposnse.status}: ${resposnse.message}`);
                }
              } catch (error) {
                if (isApiError(error)) {
                  toast.error(error.message);
                }
                toast.error("Traveller creation failed for unknown reason");
              }
            }
            void create();
          }}
          //values={generalInformationData}
        >
          <AutoFormSubmit className="float-right">
            <>{languageData.Save}</>
          </AutoFormSubmit>
        </AutoForm>
      </Card>
    </>
  );
}
