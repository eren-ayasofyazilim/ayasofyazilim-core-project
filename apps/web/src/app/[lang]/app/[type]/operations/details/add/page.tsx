"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import Stepper, {
  StepperContent,
} from "@repo/ayasofyazilim-ui/organisms/stepper";
import { Button } from "@/components/ui/button";
import { useLocale } from "src/providers/locale";
import { getResourceDataClient } from "src/language-data/ContractService";
import type { MerchantStepFormDataDto } from "../../../contracts/contracts/new-contract/utils";
import { SelectMerchantStep } from "../../../contracts/contracts/new-contract/components";

export default function Page() {
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, "en");

  // const [isSubmitStarted, setIsSubmitStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [merchantStepFormData, setMerchantStepFormData] =
    useState<MerchantStepFormDataDto>({
      merchantId: "",
      addressId: "",
    });

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
                canGoNext={Boolean(merchantStepFormData.addressId)}
                className="relative flex size-full overflow-auto"
                controlsClassName="absolute bottom-4 right-4 w-[calc(100% - 2rem)] left-4"
                title={languageData["Contracts.Create.Step.Merchant"]}
              >
                <SelectMerchantStep
                  languageData={languageData}
                  onParsedValuesChanged={(values) => {
                    setMerchantStepFormData(values as MerchantStepFormDataDto);
                  }}
                  step={step}
                />
              </StepperContent>

              <StepperContent
                canGoNext={false}
                className="relative flex size-full  overflow-hidden pb-16"
                controlsClassName="absolute bottom-4 right-4 w-[calc(100% - 2rem)] left-4"
                title={languageData["Contracts.Create.Step.ContractSettings"]}
              >
                <SelectMerchantStep
                  languageData={languageData}
                  onParsedValuesChanged={(values) => {
                    setMerchantStepFormData(values as MerchantStepFormDataDto);
                  }}
                  step={step}
                />
              </StepperContent>

              <StepperContent
                // canGoBack={!isSubmitStarted}
                canGoNext={false}
                className="relative flex size-full  overflow-auto rounded-lg border p-4 pb-16"
                controlsClassName="absolute bottom-4 right-4 w-[calc(100% - 2rem)] left-4"
                title={languageData["Contracts.Create.Step.Documents"]}
              >
                <SelectMerchantStep
                  languageData={languageData}
                  onParsedValuesChanged={(values) => {
                    setMerchantStepFormData(values as MerchantStepFormDataDto);
                  }}
                  step={step}
                />
                <Button
                  className="absolute bottom-4 right-4 z-10"
                  // disabled={isSubmitStarted}
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
