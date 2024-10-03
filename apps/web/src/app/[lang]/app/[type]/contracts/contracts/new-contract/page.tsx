"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_Contracts_ContractHeaders_ContractHeaderCreateDto as ContractHeaderCreateDto,
  UniRefund_ContractService_Contracts_ContractSettings_ContractSettingCreateDto as ContractSettingCreateDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_Contracts_ContractSettings_ContractSettingCreateDto as ContractSettingCreateSchema } from "@ayasofyazilim/saas/ContractService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import {
  EmptyCard,
  FileUploader,
} from "@repo/ayasofyazilim-ui/molecules/file-uploader";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import Stepper, {
  StepperContent,
} from "@repo/ayasofyazilim-ui/organisms/stepper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getResourceDataClient } from "src/language-data/ContractService";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import { postContractsContractHeaders } from "../../actions/contracts";
import { SelectMerchantStep } from "./components";
import type { MerchantStepFormDataDto } from "./utils";

type ContractSettingsStepDto = Pick<
  ContractSettingCreateDto,
  | "name"
  | "referenceNumber"
  | "invoicingFrequency"
  | "invoiceChannel"
  | "invoicingAddressId"
  | "receiptType"
  | "crossTaxFreeForm"
  | "facturaNumberIsUnique"
  | "excludeFromCashLimit"
  | "deskoScanner"
  | "eTaxFree"
>;

export default function Page({ params }: { params: { lang: string } }) {
  const router = useRouter();
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);

  const [isSubmitStarted, setIsSubmitStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [merchantStepFormData, setMerchantStepFormData] =
    useState<MerchantStepFormDataDto>({
      merchantId: "",
      addressId: "",
    });

  const [settingStepFormData, setSettingStepFormData] =
    useState<ContractSettingsStepDto>();

  const handleCreateContract = () => {
    setIsSubmitStarted(true);
    if (!settingStepFormData) return;
    const data: ContractHeaderCreateDto = {
      ...merchantStepFormData,
      rebateSetting: {
        extraProperties: undefined,
        referenceNumber: 0,
        isTrustedMerchant: false,
        rebateStatementPeriod: "None",
        rebateTableHeaders: undefined,
        rebateTableHeaderIds: undefined,
        contactInformationTypeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        minimumNetCommissions: undefined,
      },
      contractSettings: [
        {
          ...settingStepFormData,
          termOfPayment: 0,
        },
      ],
    };
    void postContractsContractHeaders({ requestBody: data })
      .then((response) => {
        if (response.type === "success") {
          toast.success(response.message);
        } else if (response.type === "api-error") {
          toast.error(response.message);
          setIsSubmitStarted(false);
        } else {
          toast.error(response.message);
        }
      })
      .finally(() => {
        router.push(getBaseLink("app/admin/contracts/contracts"));
      });
  };

  const [files, setFiles] = useState<File[]>([]);

  return (
    <>
      <PageHeader
        description={languageData["Contracts.Create.Description"]}
        title={languageData["Contracts.Create.Title"]}
      />
      <Card className="h-full overflow-auto py-4">
        <Stepper
          activeTabIndex={step}
          className="flex h-full flex-col gap-4 px-4"
          headerProps={{
            containerClassName: "mb-0",
          }}
          nextButtonText={languageData["Contracts.Create.Step.Next"]}
          onIndexChange={setStep}
          previousButtonText={languageData["Contracts.Create.Step.Previous"]}
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
              onParsedValuesChanged={setMerchantStepFormData}
              step={step}
            />
          </StepperContent>

          <StepperContent
            canGoNext={false}
            className="relative flex size-full  overflow-hidden pb-16"
            controlsClassName="absolute bottom-4 right-4 w-[calc(100% - 2rem)] left-4"
            title={languageData["Contracts.Create.Step.ContractSettings"]}
          >
            <ContractSettingsStep
              languageData={languageData}
              onSubmit={setSettingStepFormData}
              setStep={setStep}
              step={step}
            />
          </StepperContent>

          <StepperContent
            canGoBack={!isSubmitStarted}
            canGoNext={false}
            className="relative flex size-full  overflow-auto rounded-lg border p-4 pb-16"
            controlsClassName="absolute bottom-4 right-4 w-[calc(100% - 2rem)] left-4"
            title={languageData["Contracts.Create.Step.Documents"]}
          >
            <div className="text-muted-foreground flex size-full flex-col gap-4 overflow-auto">
              <FileUploader
                disabled={false}
                maxFileCount={4}
                maxSize={4 * 1024 * 1024}
                onUpload={(_files) => {
                  return new Promise((resolve) => {
                    setFiles(_files);
                    resolve();
                  });
                }}
                progresses={{}}
              />
              <UploadedFilesCard uploadedFiles={files} />
            </div>
            <Button
              className="absolute bottom-4 right-4 z-10"
              disabled={isSubmitStarted}
              onClick={handleCreateContract}
              type="button"
            >
              {languageData["Contracts.Create.Step.Submit"]}
            </Button>
          </StepperContent>
        </Stepper>
      </Card>
    </>
  );
}

function ContractSettingsStep({
  step,
  setStep,
  onSubmit,
  languageData,
}: {
  step: number;
  setStep: (step: number) => void;
  onSubmit: (data: ContractSettingsStepDto) => void;
  languageData: ContractServiceResource;
}) {
  const contractSettingIncludes = [
    "name",
    "referenceNumber",
    "invoicingFrequency",
    "invoiceChannel",
    "invoicingAddressId",
    "receiptType",
    "crossTaxFreeForm",
    "facturaNumberIsUnique",
    "excludeFromCashLimit",
    "deskoScanner",
    "eTaxFree",
  ];
  return (
    <div className="mx-auto size-full max-w-3xl overflow-y-auto">
      <AutoForm
        className="grid grid-cols-2 items-end gap-4 space-y-0 p-px"
        fieldConfig={{
          name: {
            containerClassName: "col-span-2",
          },
          eTaxFree: { fieldType: "switch" },
          crossTaxFreeForm: { fieldType: "switch" },
          facturaNumberIsUnique: { fieldType: "switch" },
          excludeFromCashLimit: { fieldType: "switch" },
          deskoScanner: { fieldType: "switch" },
          invoicingAddressId: { containerClassName: "hidden" },
        }}
        formClassName="overflow-visible"
        formSchema={createZodObject(
          ContractSettingCreateSchema,
          contractSettingIncludes,
        )}
        onSubmit={(data) => {
          onSubmit(data as ContractSettingsStepDto);
          setStep(step + 1);
        }}
        values={{ invoicingAddressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6" }}
      >
        <Button className="absolute bottom-4 right-4 z-10">
          {languageData["Contracts.Create.Step.Previous"]}
        </Button>
      </AutoForm>
    </div>
  );
}
interface UploadedFilesCardProps {
  uploadedFiles: File[];
}

function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
  return (
    <div>
      {/* <CardHeader>
        <CardTitle>Uploaded files</CardTitle>
        <CardDescription>View the uploaded files here</CardDescription>
      </CardHeader> */}
      {/* <CardContent> */}
      {/* </CardContent> */}
      {uploadedFiles.length > 0 ? (
        <ScrollArea className="pb-4">
          <div className="flex w-max space-x-2.5">
            {uploadedFiles.map((file) => {
              const url = window.URL.createObjectURL(file);
              return (
                <div className="relative aspect-video w-64" key={file.name}>
                  <Image
                    alt={file.name}
                    className="rounded-md object-cover"
                    fill
                    loading="lazy"
                    sizes="(min-width: 640px) 640px, 100vw"
                    src={url}
                  />
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <EmptyCard
          className="w-full"
          description="Upload some files to see them here"
          title="No files uploaded"
        />
      )}
    </div>
  );
}
