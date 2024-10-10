import type { ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import defaultEn from "../Default/resources/en.json";
import defaultTr from "../Default/resources/tr.json";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

// const data: LanguageDataType = {
//   tr,
//   en,
// };

export type CRMServiceServiceResource = typeof en & typeof defaultEn;
export interface CRMServiceServiceResource2 {
  Merchants: string;
  "Merchants.Description": string;

  "Merchants.New": string;
  "Merchants.New.Description": string;
  "Merchants.New.Success": string;
  "Merchants.New.Fail": string;

  "Merchants.Edit": string;
  "Merchants.Edit.Description": string;
  "Merchants.Edit.Success": string;
  "Merchants.Edit.Fail": string;

  "Merchants.SubOrganization": string;
  "Merchants.SubOrganization.Description": string;
  "Merchants.SubOrganization.New": string;
  "Merchants.SubOrganization.New.Description": string;

  RefundPoints: string;
  "RefundPoints.Description": string;

  "RefundPoints.New": string;
  "RefundPoints.New.Description": string;
  "RefundPoints.New.Success": string;
  "RefundPoints.New.Fail": string;

  "RefundPoints.Edit": string;
  "RefundPoints.Edit.Description": string;
  "RefundPoints.Edit.Success": string;
  "RefundPoints.Edit.Fail": string;

  TaxFree: string;
  "TaxFree.Description": string;

  "TaxFree.New": string;
  "TaxFree.New.Description": string;
  "TaxFree.New.Success": string;
  "TaxFree.New.Fail": string;

  "TaxFree.Edit": string;
  "TaxFree.Edit.Description": string;
  "TaxFree.Edit.Success": string;
  "TaxFree.Edit.Fail": string;

  Customs: string;
  "Customs.Description": string;

  "Customs.New": string;
  "Customs.New.Description": string;
  "Customs.New.Success": string;
  "Customs.New.Fail": string;

  "Customs.Edit": string;
  "Customs.Edit.Description": string;
  "Customs.Edit.Success": string;
  "Customs.Edit.Fail": string;

  TaxOffices: string;
  "TaxOffices.Description": string;

  "TaxOffices.New": string;
  "TaxOffices.New.Description": string;
  "TaxOffices.New.Success": string;
  "TaxOffices.New.Fail": string;

  "TaxOffices.Edit": string;
  "TaxOffices.Edit.Description": string;
  "TaxOffices.Edit.Success": string;
  "TaxOffices.Edit.Fail": string;

  "Parties.Edit.Success": string;
  "Parties.Edit.Fail": string;
  "Parties.Organization": string;
  "Parties.Individuals": string;
  "Parties.Individuals.New": string;
  "Parties.Individuals.Description": string;
}
function getLanguageData(resources: ResourceResult, lang: string) {
  if (lang === "tr") {
    return {
      ...defaultTr,
      ...tr,
    };
  }
  return {
    ...defaultEn,
    ...en,
  };
}
export async function getResourceData(lang: string) {
  const resources = await getLocalizationResources(lang);
  const languageData = getLanguageData(resources, lang);
  return {
    languageData,
    resources,
  };
}
export function getResourceDataClient(resources: ResourceResult, lang: string) {
  const languageData = getLanguageData(resources, lang);
  return languageData;
}
