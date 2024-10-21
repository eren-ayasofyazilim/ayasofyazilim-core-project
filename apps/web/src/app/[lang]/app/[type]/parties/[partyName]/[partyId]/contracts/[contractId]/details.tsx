"use client";
import type { UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractHeaderDetailForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as $ContractHeaderDetailForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import type { ContractServiceResource } from "src/language-data/ContractService";

interface DetailsProp {
  contractHeaderDetails: ContractHeaderDetailForMerchantDto;
  partyName: "merchants";
  partyId: string;
  languageData: ContractServiceResource;
}
export default function Details({ ...props }: DetailsProp) {
  const { languageData } = props;
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
      <ContractSection {...props} />
      <RebateSettingsSection {...props} />
      {/* <StoresSection {...props} /> */}
      <ContractSettingsSection {...props} />
    </SectionLayout>
  );
}

function ContractSection({ ...props }: DetailsProp) {
  const $DetailsSchema = createZodObject(
    $ContractHeaderDetailForMerchantDto,
    [
      "name",
      "webSite",
      "merchantClassification",
      "status",
      "isDraft",
      "addressCommonData",
      "contractHeaderRefundTableHeaders",
    ],
    undefined,
    {
      merchantBasicInformationDto: ["name", "numberOfStores"],
      addressCommonData: [
        "countryId",
        "regionId",
        "cityId",
        "districtId",
        "neighborhoodId",
        "addressLine",
        "type",
      ],
    },
  );

  return (
    <SectionLayoutContent sectionId="contract">
      <AutoForm
        className="grid gap-2 space-y-0 md:grid-cols-2"
        fieldConfig={{
          isDraft: {
            fieldType: "switch",
          },
          merchantBasicInformationDto: {
            className:
              "md:col-span-2 md:grid md:grid-cols-2 md:space-y-0 md:gap-2",
          },
          addressCommonData: {
            className: "md:col-span-2",
          },
          contractHeaderRefundTableHeaders: {
            className: "md:col-span-2",
          },
        }}
        formSchema={$DetailsSchema}
        values={props.contractHeaderDetails}
      />
    </SectionLayoutContent>
  );
}

function ContractSettingsSection({ languageData }: DetailsProp) {
  return (
    <SectionLayoutContent sectionId="contract-settings">
      <>{languageData["Contracts.Create.ContractSettings"]}</>
    </SectionLayoutContent>
  );
}

function RebateSettingsSection({ languageData }: DetailsProp) {
  return (
    <SectionLayoutContent sectionId="rebate-setting">
      <>{languageData["Contracts.Create.RebateSettings"]}</>
    </SectionLayoutContent>
  );
}
