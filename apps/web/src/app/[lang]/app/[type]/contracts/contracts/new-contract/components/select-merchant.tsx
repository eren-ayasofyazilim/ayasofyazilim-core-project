import type {
  UniRefund_CRMService_Merchants_MerchantDetailDto as MerchantDetailDto,
  Volo_Abp_Application_Dtos_PagedResultDto_16 as MerchantPagedListDto,
  UniRefund_CRMService_Merchants_MerchantProfileDto as MerchantProfileDto,
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
import { $UniRefund_CRMService_Organizations_OrganizationDto as OrganizationSchema } from "@ayasofyazilim/saas/CRMService";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { createReadonlyFieldConfig } from "../components";

export default function SelectMerchant({
  languageData,
  merchantDetails,
  merchantList,
  handleMerchantChange,
}: {
  languageData: ContractServiceResource;
  merchantDetails: MerchantDetailDto | undefined;
  merchantList: MerchantPagedListDto | undefined;
  handleMerchantChange: (value: string) => void;
}) {
  const organizationIncludes = [
    "taxpayerId",
    "legalStatusCode",
    "customerNumber",
  ];

  return (
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
              placeholder={languageData["Contracts.Create.Step.SelectMerchant"]}
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
          merchantDetails?.merchant?.entityInformations?.[0].organizations?.[0]
        }
      />
    </div>
  );
}
