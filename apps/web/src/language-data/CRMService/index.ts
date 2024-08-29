import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface CRMServiceServiceResource {
  new: string;
  Edit: string;
  Delete: string;
  Merchants: string;
  "Merchants.New": string;
  RefundPoints: string;
  "RefundPoints.New": string;
  Customs: string;
  "Customs.New": string;
  TaxFree: string;
  "TaxFree.New": string;
  TaxOffices: string;
  "TaxOffices.New": string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): CRMServiceServiceResource {
  const resource = resources.CrmService?.texts;
  const uiResource = resources.AbpUi?.texts;
  return {
    new: resource?.new || data[lang]?.new || data.en.new,
    Edit: uiResource?.Edit || data[lang]?.Edit || data.en.Edit,
    Delete: uiResource?.Delete || data[lang]?.Delete || data.en.Delete,
    Merchants:
      resource?.Merchants || data[lang]?.Merchants || data.en.Merchants,
    "Merchants.New":
      resource?.["Merchants.New"] ||
      data[lang]?.["Merchants.New"] ||
      data.en["Merchants.New"],
    RefundPoints:
      resource?.RefundPoints ||
      data[lang]?.RefundPoints ||
      data.en.RefundPoints,
    "RefundPoints.New":
      resource?.["RefundPoints.New"] ||
      data[lang]?.["RefundPoints.New"] ||
      data.en["RefundPoints.New"],

    Customs: resource?.Customs || data[lang]?.Customs || data.en.Customs,
    "Customs.New":
      resource?.["Customs.New"] ||
      data[lang]?.["Customs.New"] ||
      data.en["Customs.New"],
    TaxFree: resource?.TaxFree || data[lang]?.TaxFree || data.en.TaxFree,
    "TaxFree.New":
      resource?.["TaxFree.New"] ||
      data[lang]?.["TaxFree.New"] ||
      data.en["TaxFree.New"],
    TaxOffices:
      resource?.TaxOffices || data[lang]?.TaxOffices || data.en.TaxOffices,
    "TaxOffices.New":
      resource?.["TaxOffices.New"] ||
      data[lang]?.["TaxOffices.New"] ||
      data.en["TaxOffices.New"],
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
