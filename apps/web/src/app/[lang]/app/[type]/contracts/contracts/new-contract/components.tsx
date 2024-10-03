"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type {
  UniRefund_CRMService_AddressTypes_AddressTypeDto as AddressTypeDto,
  UniRefund_CRMService_Merchants_MerchantDetailDto as MerchantDetailDto,
  Volo_Abp_Application_Dtos_PagedResultDto_16 as MerchantPagedListDto,
  UniRefund_CRMService_Merchants_MerchantProfileDto as MerchantProfileDto,
} from "@ayasofyazilim/saas/CRMService";
import {
  $UniRefund_CRMService_AddressTypes_AddressTypeDto as AddressTypeSchema,
  $UniRefund_CRMService_Organizations_OrganizationDto as OrganizationSchema,
} from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useEffect, useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";
import {
  getCrmServiceMerchants,
  getCrmServiceMerchantsDetailById,
} from "../../../crm/actions/merchant";
import type { MerchantStepFormDataDto } from "./utils";

function createReadonlyFieldConfig(
  elements: string[],
): Record<string, { inputProps: { disabled: boolean } }> {
  const tempElement = elements.map((key: string) => {
    return {
      [key]: {
        inputProps: { disabled: true },
      },
    };
  });

  return Object.assign({}, ...tempElement) as Record<
    string,
    { inputProps: { disabled: boolean } }
  >;
} //TODO: IF THIS IS USEFUL MOVE TO LIBS

export function SelectMerchantStep({
  step,
  onParsedValuesChanged,
  languageData,
}: {
  step: number;
  onParsedValuesChanged: (value: MerchantStepFormDataDto) => void;
  languageData: ContractServiceResource;
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
    <div className="mx-auto grid w-full grid-cols-2  gap-4 overflow-auto">
      <div
        className={
          merchantList
            ? "pointer-events-auto space-y-4 opacity-100"
            : "pointer-events-none cursor-not-allowed opacity-50"
        }
      >
        <div>
          <Label>{languageData["Contracts.Create.Step.Merchant"]}</Label>
          <Select onValueChange={handleMerchantChange}>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  languageData["Contracts.Create.Step.SelectMerchant"]
                }
              />
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
        <AutoForm
          className={cn(
            merchantDetails
              ? "pointer-events-auto space-y-4 opacity-100"
              : "pointer-events-none cursor-not-allowed opacity-50",
          )}
          fieldConfig={{
            ...createReadonlyFieldConfig(organizationIncludes),
            customerNumber: {
              containerClassName: "col-span-2",
              inputProps: {
                disabled: true,
              },
            },
          }}
          formSchema={createZodObject(OrganizationSchema, organizationIncludes)}
          values={
            merchantDetails?.merchant?.entityInformations?.[0]
              .organizations?.[0]
          }
        />
      </div>

      <div
        className={cn(
          "space-y-4",
          merchantDetails
            ? "pointer-events-auto w-full space-y-4 opacity-100"
            : "pointer-events-none cursor-not-allowed opacity-50",
        )}
      >
        <div>
          <Label>
            {languageData["Contracts.Create.Step.SelectMerchantAddress"]}
          </Label>
          <Select onValueChange={handleAddressChange}>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  languageData["Contracts.Create.Step.SelectMerchantAddress"]
                }
              />
            </SelectTrigger>
            <SelectContent>
              {merchantDetails?.merchant?.entityInformations?.map(
                (merchant) => {
                  return merchant.organizations?.map((individual) => {
                    return individual.contactInformations?.map((contact) => {
                      return contact.addresses?.map((address) => {
                        return (
                          <SelectItem key={address.id} value={address.id || ""}>
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
          formSchema={createZodObject(AddressTypeSchema, addressIncludes)}
          values={addressDetails}
        />
      </div>
    </div>
  );
}
