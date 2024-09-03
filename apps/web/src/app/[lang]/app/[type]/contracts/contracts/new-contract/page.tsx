"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EmptyCard,
  FileUploader,
} from "@repo/ayasofyazilim-ui/molecules/file-uploader";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import {
  UniRefund_ContractService_Contracts_ContractHeaders_ContractHeaderCreateDto as ContractHeaderCreateDto,
  $UniRefund_ContractService_Contracts_ContractSettings_ContractSettingCreateDto as ContractSettingCreateSchema,
  UniRefund_ContractService_Contracts_ContractSettings_ContractSettingCreateDto as ContractSettingCreateDto,
} from "@ayasofyazilim/saas/ContractService";
import {
  UniRefund_CRMService_AddressTypes_AddressTypeDto as AddressTypeDto,
  $UniRefund_CRMService_AddressTypes_AddressTypeDto as AddressTypeSchema,
  UniRefund_CRMService_Merchants_MerchantDetailDto as MerchantDetailDto,
  Volo_Abp_Application_Dtos_PagedResultDto_16 as MerchantPagedListDto,
  $UniRefund_CRMService_Organizations_OrganizationDto as OrganizationSchema,
  UniRefund_CRMService_Merchants_MerchantProfileDto as MerchantProfileDto,
} from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import Stepper, {
  StepperContent,
} from "@repo/ayasofyazilim-ui/organisms/stepper";
import { useEffect, useState } from "react";
import {
  getCrmServiceMerchants,
  getCrmServiceMerchantsDetailById,
} from "../../../crm/actions/merchant";
import { postContractsContractHeaders } from "../../actions/contracts";
import { useRouter } from "next/navigation";
import { getBaseLink } from "src/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
function createReadonlyFieldConfig(elements: string[]):Record<string,Record<string,Record<string,boolean>>> {
  return Object.assign(
    {},
    ...elements.map((key:string) => {
      return {
        [key]: {
          inputProps: { disabled: true },
        },
      };
    }),
  );
} //TODO: IF THIS IS USEFUL MOVE TO LIBS

type MerchantStepFormDataDto = Pick<
  ContractHeaderCreateDto,
  "merchantId" | "addressId"
>;
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

export default function Page() {
  const router = useRouter();
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
        rebateStatementPeriod: 0,
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
      <PageHeader title="Create Contract" description="Create a new contract" />
      <Card className="h-full py-4">
        <Stepper
          activeTabIndex={step}
          onIndexChange={setStep}
          className="flex h-full flex-col gap-4 px-4"
          headerProps={{
            containerClassName: "mb-0",
          }}
        >
          <StepperContent
            title="Merchant"
            canGoBack={false}
            canGoNext={merchantStepFormData.addressId ? true : false}
            className="relative flex size-full"
            controlsClassName="absolute bottom-4 right-4 w-[calc(100% - 2rem)] left-4"
          >
            <SelectMerchantStep
              step={step}
              onParsedValuesChanged={setMerchantStepFormData}
            />
          </StepperContent>

          <StepperContent
            canGoNext={false}
            title="Contract Settings"
            className="relative flex size-full  overflow-hidden pb-16"
            controlsClassName="absolute bottom-4 right-4 w-[calc(100% - 2rem)] left-4"
          >
            <ContractSettingsStep
              step={step}
              setStep={setStep}
              onSubmit={setSettingStepFormData}
            />
          </StepperContent>

          <StepperContent
            canGoBack={!isSubmitStarted}
            canGoNext={false}
            title="Documents"
            className="relative flex size-full  overflow-hidden rounded-lg border p-4 pb-16"
            controlsClassName="absolute bottom-4 right-4 w-[calc(100% - 2rem)] left-4"
          >
            <div className="text-muted-foreground flex size-full flex-col gap-4 overflow-auto">
              <FileUploader
                maxFileCount={4}
                maxSize={4 * 1024 * 1024}
                progresses={{}}
                onUpload={(_files) => {
                  return new Promise((resolve) => {
                    setFiles(_files);
                    resolve();
                  });
                }}
                disabled={false}
              />
              <UploadedFilesCard uploadedFiles={files} />
            </div>
            <Button
              className="absolute bottom-4 right-4 z-10"
              type="button"
              onClick={handleCreateContract}
            >
              Submit
            </Button>
          </StepperContent>
        </Stepper>
      </Card>
    </>
  );
}

function SelectMerchantStep({
  step,
  onParsedValuesChanged,
}: {
  step: number;
  onParsedValuesChanged: (value: MerchantStepFormDataDto) => void;
}) {
  const [merchantList, setMerchantList] = useState<MerchantPagedListDto>();
  const [merchantDetails, setMerchantDetails] = useState<MerchantDetailDto>();
  const [selectedMerchant, setSelectedMerchant] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [addressDetails, setAddressDetails] = useState<AddressTypeDto>();
  useEffect(() => {
    if (step === 0) {
      setMerchantDetails(undefined);
      setSelectedAddress("");
      setSelectedMerchant("");
    }
  }, [step]);
  useEffect(() => {
    onParsedValuesChanged({
      merchantId: selectedMerchant,
      addressId: selectedAddress,
    });
  }, [selectedAddress]);
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
    setSelectedAddress("");
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

  const handleAddressChange = (value: string) => {
    setSelectedAddress(value);
    setAddressDetails(
      merchantDetails?.merchant?.entityInformations
        ?.at(0)
        ?.organizations?.at(0)
        ?.contactInformations?.at(0)
        ?.addresses?.find((address) => address.id === value),
    );
  };

  const addressIncludes = [
    "addressLine",
    "country",
    "city",
    "terriority",
    "postalCode",
    "fullAddress",
  ];
  const organizationIncludes = [
    "taxpayerId",
    "legalStatusCode",
    "customerNumber",
  ];
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 overflow-auto">
      <div
        className={
          merchantList
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none cursor-not-allowed opacity-50"
        }
      >
        <Label>Select Merchant</Label>
        <Select onValueChange={handleMerchantChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select merchant" />
          </SelectTrigger>
          <SelectContent>
          {merchantList?.items?.map((merchant: MerchantProfileDto) => {
              return (
                <SelectItem key={merchant.id} value={merchant.id || ""}>
                  {merchant.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div
        className={cn(
          "space-y-4",
          merchantDetails
            ? "w-fullopacity-100 pointer-events-auto"
            : "pointer-events-none cursor-not-allowed opacity-50",
        )}
      >
        <AutoForm
          className="grid grid-cols-2 items-end gap-4 space-y-0"
          formSchema={createZodObject(OrganizationSchema, organizationIncludes)}
          values={
            merchantDetails?.merchant?.entityInformations?.[0]
              .organizations?.[0]
          }
          fieldConfig={{
            ...createReadonlyFieldConfig(organizationIncludes),
            customerNumber: {
              containerClassName: "col-span-2",
              inputProps: {
                disabled: true,
              },
            },
          }}
        />
        <div>
          <Label>Select Merchant Address</Label>
          <Select onValueChange={handleAddressChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select address" />
            </SelectTrigger>
            <SelectContent>
              {merchantDetails?.merchant?.entityInformations?.map(
                (merchant) => {
                  return merchant.organizations?.map((individual) => {
                    return individual.contactInformations?.map((contact) => {
                      return contact.addresses?.map((address) => {
                        return (
                          <SelectItem
                            key={address.id}
                            value={address.id as string}
                          >
                            {address.fullAddress}
                          </SelectItem>
                        );
                      });
                    });
                  });
                },
              )}
            </SelectContent>
          </Select>
        </div>
        <AutoForm
          className="grid grid-cols-2 items-end gap-4 space-y-0"
          formSchema={createZodObject(AddressTypeSchema, addressIncludes)}
          fieldConfig={{
            ...createReadonlyFieldConfig(addressIncludes),
            addressLine: {
              containerClassName: "col-span-2",
              inputProps: { disabled: true },
            },
            fullAddress: {
              containerClassName: "col-span-2",
              inputProps: { disabled: true },
            },
          }}
          values={addressDetails}
        />
      </div>
    </div>
  );
}

function ContractSettingsStep({
  step,
  setStep,
  onSubmit,
}: {
  step: number;
  setStep: (step: number) => void;
  onSubmit: (data: ContractSettingsStepDto) => void;
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
        onSubmit={(data) => {
          onSubmit(data as ContractSettingsStepDto);
          setStep(step + 1);
        }}
        formSchema={createZodObject(
          ContractSettingCreateSchema,
          contractSettingIncludes,
        )}
        formClassName="overflow-visible"
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
        values={{ invoicingAddressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6" }}
      >
        <Button className="absolute bottom-4 right-4 z-10">Next</Button>
      </AutoForm>
    </div>
  );
}
interface UploadedFilesCardProps {
  uploadedFiles: File[];
}

export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded files</CardTitle>
        <CardDescription>View the uploaded files here</CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4">
            <div className="flex w-max space-x-2.5">
              {uploadedFiles.map((file) => {
                const url = window.URL.createObjectURL(file);
                return (
                  <div key={file.name} className="relative aspect-video w-64">
                    <Image
                      src={url}
                      alt={file.name}
                      fill
                      sizes="(min-width: 640px) 640px, 100vw"
                      loading="lazy"
                      className="rounded-md object-cover"
                    />
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}
