"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantCreateDto as ContractHeaderForMerchantCreateDto,
  GetApiContractServiceMerchantsContractsContractHeadersByIdGetMissingStepsResponse as MissingSteps,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto as RefundTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantCreateDto as $ContractHeaderForMerchantCreateDto,
  $UniRefund_ContractService_ContractsForMerchant_ContractSettings_ContractSettingCreateDto as $ContractSettingCreateDto,
} from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_CRMService_AddressTypes_AddressTypeDto as AddressTypeDto } from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import type { AutoFormInputComponentProps } from "@repo/ayasofyazilim-ui/organisms/auto-form";
import AutoForm, {
  AutoFormSubmit,
  createFieldConfigWithResource,
  createFieldTypeFieldConfig,
  CustomCombobox,
  mergeFieldConfigs,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { toastOnSubmit } from "@repo/ui/toast-on-submit";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import Rebate from "src/app/[lang]/app/[type]/settings/templates/rebate/rebate";
import { getRefundTableHeaders } from "src/app/[lang]/app/[type]/settings/templates/refund/action";
import {
  getMerchantContractHeaderMissingStepsByIdApi,
  postMerchantContractHeadersByMerchantIdApi,
} from "src/app/[lang]/app/actions/ContractService/action";
import type { ContractServiceResource } from "src/language-data/ContractService";

export default function ContractHeaderForm({
  params,
  languageData,
  addresses,
  //   basicInformation,
}: {
  params: {
    partyName: "merchants";
    partyId: string;
    lang: string;
  };
  languageData: ContractServiceResource;
  addresses: AddressTypeDto[];
  //   basicInformation: MerchantBasicInformationDto;
}): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [addressList] = useState<AddressTypeDto[]>(addresses);
  const [missingSteps, setMissingSteps] = useState<MissingSteps>();

  useEffect(() => {
    toast.warning(missingSteps);
  }, [missingSteps]);
  return (
    <SectionLayout
      defaultActiveSectionId="contract"
      sections={[
        {
          id: "contract",
          name: languageData["Contracts.Create.ContractHeader"],
        },
        {
          id: "rebate-setting",
          name: languageData["Contracts.Create.RebateSettings"],
          disabled: false,
        },
        {
          id: "contract-settings",
          name: languageData["Contracts.Create.ContractSettings"],
          disabled: false,
        },
      ]}
      vertical
    >
      <ContractSection
        addressList={addressList}
        languageData={languageData}
        loading={loading}
        partyId={params.partyId}
        setLoading={setLoading}
        setMissingSteps={setMissingSteps}
      />
      <ContractSettingsSection
        addressList={addressList}
        languageData={languageData}
        loading={loading}
        setLoading={setLoading}
      />
      {/* <StoresSection /> */}
      <RebateSettingsSection
        languageData={languageData}
        loading={loading}
        setLoading={setLoading}
      />
    </SectionLayout>
  );
}

function ContractSection({
  partyId,
  loading,
  addressList,
  setLoading,
  setMissingSteps,
  languageData,
}: {
  partyId: string;
  loading: boolean;
  addressList: AddressTypeDto[] | undefined | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setMissingSteps: Dispatch<SetStateAction<MissingSteps | undefined>>;
  languageData: ContractServiceResource;
}): JSX.Element {
  const $contractHeader = createZodObject($ContractHeaderForMerchantCreateDto);
  const [refundTableHeaders, setRefundTableHeaders] =
    useState<RefundTableHeaderDto[]>();
  //   const [selectedRefundTableHeader, setSelectedRefundTableHeader] = useState<
  //     RefundTableHeaderDto | undefined | null
  //   >(undefined);

  async function fetchContractMissingSteps(): Promise<void> {
    setLoading(true);
    try {
      const missingStepsResponse =
        await getMerchantContractHeaderMissingStepsByIdApi({
          id: partyId,
        });
      if (missingStepsResponse.type === "success") {
        setMissingSteps(missingStepsResponse.data);
      } else {
        toast.error(
          missingStepsResponse.message || missingStepsResponse.status,
        );
      }
    } catch (error) {
      toast.error("An error occurred while fetching contract missing steps."); //gonna change
    } finally {
      setLoading(false);
    }
  }
  async function handleContractHeaderSubmit(
    data: ContractHeaderForMerchantCreateDto,
  ): Promise<void> {
    toastOnSubmit(data);

    const postResponse = await postMerchantContractHeadersByMerchantIdApi({
      id: partyId,
      requestBody: data,
    });
    if (postResponse.type !== "success") {
      if (postResponse.type === "api-error") {
        toast.error(postResponse.message);
      }
    }
    toast.success(postResponse.message || postResponse.status);
    void fetchContractMissingSteps();
  }

  useEffect(() => {
    async function fetchRefundTableHeaders(): Promise<void> {
      setLoading(true);
      try {
        const response = await getRefundTableHeaders({ maxResultCount: 100 });
        if (response.type === "error" || response.type === "api-error") {
          toast.error(response.message || response.status);
        } else {
          setRefundTableHeaders(response.data.items || []);
        }
      } catch (error) {
        toast.error("An error occurred while fetching refund table headers.");
      } finally {
        setLoading(false);
      }
    }
    void fetchRefundTableHeaders();
  }, []);

  const fieldConfig = createFieldConfigWithResource({
    name: "Contracts.Form",
    resources: languageData,
    schema: $ContractHeaderForMerchantCreateDto,
    extend: {
      addressCommonDataId: {
        renderer: (props: AutoFormInputComponentProps) => {
          return (
            <CustomCombobox<AddressTypeDto>
              childrenProps={props}
              emptyValue={
                languageData["Contracts.Form.addressCommonDataId.emptyValue"]
              }
              list={addressList}
              searchPlaceholder={
                languageData[
                  "Contracts.Form.addressCommonDataId.searchPlaceholder"
                ]
              }
              searchResultLabel={
                languageData[
                  "Contracts.Form.addressCommonDataId.searchResultLabel"
                ]
              }
              selectIdentifier="id"
              selectLabel="addressLine"
            />
          );
        },
      },
      refundTableHeaders: {
        refundTableHeaderId: {
          containerClassName: "flex-1",
          renderer: (props: AutoFormInputComponentProps) => {
            return (
              <CustomCombobox<RefundTableHeaderDto>
                childrenProps={props}
                emptyValue={
                  languageData["Contracts.Form.refundTableHeaderId.emptyValue"]
                }
                list={refundTableHeaders || []}
                searchPlaceholder={
                  languageData[
                    "Contracts.Form.refundTableHeaderId.searchPlaceholder"
                  ]
                }
                selectIdentifier="id"
                selectLabel="name"
                searchResultLabel={
                  languageData[
                    "Contracts.Form.refundTableHeaderId.searchResultLabel"
                  ]
                }
                // onValueChange={setSelectedRefundTableHeader}
              />
            );
          },
        },
        isDefault: {
          fieldType: "switch",
        },
      },
    },
  });
  return (
    <SectionLayoutContent sectionId="contract">
      <AutoForm
        fieldConfig={fieldConfig}
        formClassName="relative"
        formSchema={$contractHeader}
        isLoading={loading}
        onSubmit={(data) => {
          void handleContractHeaderSubmit(
            data as ContractHeaderForMerchantCreateDto,
          );
        }}
        stickyChildren
      >
        {!loading ? (
          <AutoFormSubmit className="ml-auto">
            {languageData["Contracts.Create.Submit"]}
          </AutoFormSubmit>
        ) : (
          <Skeleton className="ml-auto h-9 w-24" />
        )}
      </AutoForm>
    </SectionLayoutContent>
  );
}
function ContractSettingsSection({
  loading,
  addressList,
  setLoading,
  languageData,
}: {
  loading: boolean;
  addressList: AddressTypeDto[] | undefined | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  languageData: ContractServiceResource;
}): JSX.Element {
  const $contractSettings = createZodObject($ContractSettingCreateDto, [
    "name",
    "isDefault",
    "referenceNumber",
    "termOfPayment",
    "invoicingFrequency",
    "invoiceChannel",
    "invoicingAddressCommonDataId",
    "receiptType",
    "eTaxFree",
    "crossTaxFreeForm",
    "facturaNumberIsUnique",
    "excludeFromCashLimit",
    "deskoScanner",
    "deliveryFee",
    "goodsHaveSerialNumbers",
    "factoring",
  ]);
  const contractSettingsSwitches = createFieldTypeFieldConfig({
    elements: [
      "eTaxFree",
      "crossTaxFreeForm",
      "facturaNumberIsUnique",
      "excludeFromCashLimit",
      "deskoScanner",
      "deliveryFee",
      "goodsHaveSerialNumbers",
      "factoring",
      "isDefault",
    ],
    fieldType: "switch",
  });
  return (
    <SectionLayoutContent sectionId="contract-settings">
      <AutoForm
        className="grid grid-cols-2 items-end gap-4 space-y-0 p-px"
        fieldConfig={mergeFieldConfigs(contractSettingsSwitches, {
          name: {
            containerClassName: "col-span-2",
            inputProps: {
              disabled: true,
              autoComplete: "off",
            },
          },
          isDefault: {
            order: 1,
            inputProps: {
              disabled: true,
            },
          },
          invoicingAddressCommonDataId: {
            renderer: (props: AutoFormInputComponentProps) => {
              return (
                <CustomCombobox<AddressTypeDto>
                  childrenProps={props}
                  list={addressList}
                  selectIdentifier="id"
                  selectLabel="addressLine"
                />
              );
            },
          },
        })}
        formSchema={$contractSettings}
        isLoading={loading}
        onSubmit={(data: object) => {
          setLoading(true);
          toastOnSubmit(data);
          setLoading(false);
        }}
        stickyChildren
        values={{
          name: "Default",
          isDefault: true,
        }}
      >
        <AutoFormSubmit className="ml-auto">
          {languageData["Contracts.Create.Submit"]}
        </AutoFormSubmit>
      </AutoForm>
    </SectionLayoutContent>
  );
}
function RebateSettingsSection({
  loading,
  languageData,
  setLoading,
}: {
  loading: boolean;
  languageData: ContractServiceResource;
  setLoading: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <SectionLayoutContent sectionId="rebate-setting">
      {!loading && (
        <Rebate
          initialFeesData={[]}
          initialSetupData={[]}
          languageData={languageData}
          onSubmit={(data) => {
            setLoading(true);
            toastOnSubmit(data);
            setLoading(false);
            //     void postRebateTablesRebateTableHeaders({
            //       requestBody: {
            //         isTemplate: true, //this is necessary to create as template
            //         ...data,
            //       },
            //     })
            //       .then((response) => {
            //         if (response.type === "success") {
            //           toast.success(
            //             response.message ||
            //               "New rebate template created successfully",
            //           );
            //         } else if (response.type === "api-error") {
            //           (response.data as string)
            //             .split("\n")
            //             .forEach((error) => error.length > 0 && toast.error(error));
            //         } else {
            //           toast.error("Fatal error");
            //         }
            //       })
            //       .finally(() => {});
          }}
        />
      )}
    </SectionLayoutContent>
  );
}
