"use client";

import SelectTabs, {
  SelectTabsContent,
} from "@repo/ayasofyazilim-ui/molecules/select-tabs";
import { Building2, User } from "lucide-react";
import { useState } from "react";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { PartyNameType } from "../../types";
import Individual from "./individual/form";
import Organization from "./organization/form";

type TabSection = "Organization" | "Individual";
export default function Form({
  partyName,
  taxOfficesEnum,
  citiesEnum,
  languageData,
}: {
  partyName: Exclude<PartyNameType, "individuals">;
  taxOfficesEnum: { name: string; id: string }[];
  citiesEnum: { name: string; id: string }[];
  languageData: CRMServiceServiceResource;
}) {
  const [activeTab, setActiveTab] = useState<TabSection>("Organization");

  if (partyName !== "merchants") {
    return (
      <Organization
        citiesEnum={citiesEnum}
        languageData={languageData}
        partyName={partyName}
        taxOfficesEnum={taxOfficesEnum}
      />
    );
  }
  return (
    <>
      <div className="mb-3">
        <SelectTabs
          onValueChange={(value) => {
            setActiveTab(value as TabSection);
          }}
          value={activeTab}
        >
          <SelectTabsContent value="Organization">
            <div className="flex flex-row items-center gap-1">
              <Building2 />
              Organization
            </div>
          </SelectTabsContent>
          <SelectTabsContent value="Individual">
            <div className="flex flex-row items-center gap-1">
              <User />
              Individual
            </div>
          </SelectTabsContent>
        </SelectTabs>
      </div>
      {activeTab === "Organization" ? (
        <Organization
          citiesEnum={citiesEnum}
          languageData={languageData}
          partyName={partyName}
          taxOfficesEnum={taxOfficesEnum}
        />
      ) : (
        <Individual
          citiesEnum={citiesEnum}
          languageData={languageData}
          partyName={partyName}
          taxOfficesEnum={taxOfficesEnum}
        />
      )}
    </>
  );
}
