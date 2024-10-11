"use client";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_CRMService_Merchants_MerchantDetailDto as MerchantDetailDto,
  Volo_Abp_Application_Dtos_PagedResultDto_16 as MerchantPagedListDto,
} from "@ayasofyazilim/saas/CRMService";
import { useEffect, useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";
import {
  getPartyDetail,
  getPartyTableData,
} from "../../../parties/[partyName]/action";
import SelectAddress from "./components/select-address";
import SelectMerchant from "./components/select-merchant";

export function createReadonlyFieldConfig(
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
  onParsedValuesChanged: (value: unknown) => void;
  languageData: ContractServiceResource;
}) {
  const [merchantList, setMerchantList] = useState<MerchantPagedListDto>();
  const [merchantDetails, setMerchantDetails] = useState<MerchantDetailDto>();
  const [selectedMerchant, setSelectedMerchant] = useState<string>("");
  useEffect(() => {
    if (step === 0) {
      setMerchantDetails(undefined);
      setSelectedMerchant("");
    }
  }, [step]);
  useEffect(() => {
    void getPartyTableData("merchants", 0, 100).then((response) => {
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
    void getPartyDetail("merchants", value).then((response) => {
      if (response.type === "success") {
        setMerchantDetails(response.data as MerchantDetailDto);
      } else if (response.type === "api-error") {
        toast.error(response.message || "Merchant loading failed");
      } else {
        toast.error("Fatal error");
      }
    });
  };

  return (
    <div className="mx-auto grid w-full grid-cols-2  gap-4 overflow-auto">
      <SelectMerchant
        handleMerchantChange={handleMerchantChange}
        languageData={languageData}
        merchantDetails={merchantDetails}
        merchantList={merchantList}
      />
      <SelectAddress
        languageData={languageData}
        merchantDetails={merchantDetails}
        onParsedValuesChanged={onParsedValuesChanged}
        selectedMerchant={selectedMerchant}
        step={step}
      />
    </div>
  );
}
