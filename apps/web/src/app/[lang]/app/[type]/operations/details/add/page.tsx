"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Stepper, {
  StepperContent,
} from "@repo/ayasofyazilim-ui/organisms/stepper";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_CRMService_Merchants_MerchantDetailDto as MerchantDetailDto,
  Volo_Abp_Application_Dtos_PagedResultDto_16 as MerchantPagedListDto,
} from "@ayasofyazilim/saas/CRMService";
import { useLocale } from "src/providers/locale";
import { getResourceDataClient } from "src/language-data/ContractService";
import {
  getCrmServiceMerchants,
  getCrmServiceMerchantsDetailById,
} from "../../../crm/actions/merchant";
import SelectMerchant from "../../../contracts/contracts/new-contract/components/select-merchant";

export default function Page() {
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, "en");

  const [merchantList, setMerchantList] = useState<MerchantPagedListDto>();
  const [merchantDetails, setMerchantDetails] = useState<MerchantDetailDto>();
  const [selectedMerchant, setSelectedMerchant] = useState<string>("");

  useEffect(() => {
    void getCrmServiceMerchants({}).then((response) => {
      if (response.type === "success") {
        setMerchantList(response.data);
      } else if (response.type === "api-error") {
        toast.error(response.message || "Merchant loading failed");
      } else {
        toast.error("Fatal error");
      }
    });
  }, []);
  const handleMerchantChange = (value: string) => {
    setSelectedMerchant(value);
    setMerchantDetails(undefined);
    void getCrmServiceMerchantsDetailById({
      id: value,
    }).then((response) => {
      if (response.type === "success") {
        setMerchantDetails(response.data);
      } else if (response.type === "api-error") {
        toast.error(response.message || "Merchant loading failed");
      } else {
        toast.error("Fatal error");
      }
    });
  };

  // const [isSubmitStarted, setIsSubmitStarted] = useState(false);
  const [step, setStep] = useState(0);

  // const steps: Step[] = [
  //   {
  //     title: "Merchant information",
  //     autoformArgs: {
  //       formSchema: z.object({
  //         VatNumber: z.string(),
  //         CountryCode: z.string(),
  //         BranchId: z.string(),
  //       }),
  //     },
  //   },
  //   {
  //     title: "Traveller information",
  //     autoformArgs: {
  //       formSchema: z.object({
  //         documentNumber: z.string(),
  //         name: z.string(),
  //         lastName: z.string(),
  //         residency: z.string(),
  //         nationality: z.string(),
  //         expirationDate: z.string(),
  //         BirthDate: z.string(),
  //       }),
  //     },
  //   },
  //   {
  //     title: "Tax information",
  //     autoformArgs: {
  //       formSchema: z.object({
  //         storeName: z.string(),
  //         facturaNo: z.string(),
  //         taxes: z.array(
  //           z.object({
  //             taxName: z.string(),
  //             taxAmount: z.number(),
  //           }),
  //         ),
  //       }),
  //       fieldConfig: {
  //         all: {
  //           withoutBorder: false,
  //           inputProps: {
  //             showLabel: true,
  //             className: "w-full",
  //           },
  //         },
  //         taxes: {
  //           withoutBorder: false,
  //           inputProps: {
  //             showLabel: true,
  //             className: "bg-red-500",
  //           },
  //         },
  //       },
  //     },
  //   },
  // ];

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8 flex w-full flex-col items-center justify-start">
        <div className="w-10/12 flex-row p-4 ">
          <Card className="cantainer h-full p-6">
            <Stepper
              activeTabIndex={step}
              className="flex h-full flex-col gap-4 px-4"
              headerProps={{
                containerClassName: "mb-0",
              }}
              nextButtonText={languageData["Contracts.Create.Step.Next"]}
              onIndexChange={setStep}
              previousButtonText={
                languageData["Contracts.Create.Step.Previous"]
              }
            >
              <StepperContent
                canGoBack={false}
                canGoNext={Boolean(selectedMerchant)}
                className="relative size-full"
                controlsClassName="absolute bottom-4 right-4 w-[calc(100% - 2rem)] left-4"
                title={languageData["Contracts.Create.Step.Merchant"]}
              >
                <SelectMerchant
                  handleMerchantChange={handleMerchantChange}
                  languageData={languageData}
                  merchantDetails={merchantDetails}
                  merchantList={merchantList}
                />
              </StepperContent>

              <StepperContent
                canGoNext={false}
                className="relative flex size-full  overflow-hidden pb-16"
                controlsClassName="absolute bottom-4 right-4 w-[calc(100% - 2rem)] left-4"
                title={languageData["Contracts.Create.Step.ContractSettings"]}
              />

              <StepperContent
                canGoBack
                canGoNext
                className="relative flex size-full  overflow-auto rounded-lg border p-4 pb-16"
                controlsClassName="absolute bottom-4 right-4 w-[calc(100% - 2rem)] left-4"
                title={languageData["Contracts.Create.Step.Documents"]}
              >
                <Button
                  className="absolute bottom-4 right-4 z-10"
                  disabled={false}
                  type="button"
                >
                  {languageData["Contracts.Create.Step.Submit"]}
                </Button>
              </StepperContent>
            </Stepper>
          </Card>
        </div>
      </div>
    </div>
  );
}
