"use client";

import { Card } from "@/components/ui/card";
import {
  $UniRefund_TravellerService_AddressTypes_UpdateAddressTypeDto,
  $UniRefund_TravellerService_EmailCommonDatas_UpdateEmailCommonDataDto,
  $UniRefund_TravellerService_NameCommonDatas_CreateNameCommonDataDto,
  $UniRefund_TravellerService_PersonalIdentificationTypes_CreatePersonalIdentificationTypeDto,
  $UniRefund_TravellerService_TelephoneTypes_UpdateTelephoneTypeDto,
  $UniRefund_TravellerService_Travellers_CreateTravellerDto,
  UniRefund_TravellerService_Travellers_CreateTravellerDto,
} from "@ayasofyazilim/saas/TravellerService";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import type { TravellerServiceResource } from "src/language-data/TravellerService";
import { createZodObject, getBaseLink } from "src/utils";
import { createTraveller } from "../actions";
import { toast } from "@/components/ui/sonner";

const generalInformationSchema = createZodObject($UniRefund_TravellerService_Travellers_CreateTravellerDto,
  Object.keys($UniRefund_TravellerService_Travellers_CreateTravellerDto.properties),
);

export default function Form({
  languageData,
}: {
  languageData: TravellerServiceResource;
}) {
  return (
    <>
      <PageHeader
        LinkElement={Link}
        description={languageData.NewTravellerDescription}
        href={getBaseLink("app/admin/traveller")}
        title={languageData.NewTraveller}
      />
      <Card className="h-full w-full flex-1 overflow-auto p-5">
        <AutoForm
          formClassName="border-0"
          formSchema={generalInformationSchema}
          onSubmit={async (formdata) => {
            try {
              const resposnse = await createTraveller(formdata as UniRefund_TravellerService_Travellers_CreateTravellerDto);
              if (resposnse.type === "success") {
                toast.success("Traveller created successfully");
              }
              else {
                toast.error("Traveller creation failed");
              } 
            } catch (error) {
              console.log(error);
              toast.error("Traveller creation failed");
            }
            
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
