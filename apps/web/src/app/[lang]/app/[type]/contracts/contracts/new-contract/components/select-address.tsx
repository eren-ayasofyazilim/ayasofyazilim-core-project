import { useEffect, useState } from "react";
import { $UniRefund_CRMService_AddressTypes_AddressTypeDto as AddressTypeSchema } from "@ayasofyazilim/saas/CRMService";
import type {
  UniRefund_CRMService_AddressTypes_AddressTypeDto as AddressTypeDto,
  UniRefund_CRMService_Merchants_MerchantDetailDto as MerchantDetailDto,
} from "@ayasofyazilim/saas/CRMService";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import { cn } from "@/lib/utils";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { createReadonlyFieldConfig } from "../components";

export default function SelectAddress({
  step,
  onParsedValuesChanged,
  languageData,
  merchantDetails,
  selectedMerchant,
}: {
  step: number;
  onParsedValuesChanged: (value: unknown) => void;
  languageData: ContractServiceResource;
  merchantDetails: MerchantDetailDto | undefined;
  selectedMerchant: string;
}) {
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [addressDetails, setAddressDetails] = useState<AddressTypeDto>();
  useEffect(() => {
    setSelectedAddress("");
    setAddressDetails(undefined);
  }, [selectedMerchant]);
  useEffect(() => {
    setSelectedAddress("");
    setAddressDetails(undefined);
  }, [merchantDetails]);
  useEffect(() => {
    if (step === 0) {
      setSelectedAddress("");
    }
  }, [step]);

  useEffect(() => {
    onParsedValuesChanged({
      addressId: selectedAddress,
      merchatId: selectedMerchant,
    });
  }, [selectedAddress]);
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

  return (
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
            {merchantDetails?.merchant?.entityInformations?.map((merchant) => {
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
            })}
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
  );
}
