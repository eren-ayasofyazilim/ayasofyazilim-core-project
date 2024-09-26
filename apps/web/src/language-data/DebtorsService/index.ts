import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface TravellerServiceResource {
  new: string;
  Edit: string;
  Delete: string;
  Save: string;
  Debtors: string;
  Debtor: string;
  "Debtor.Description": string;
  "Debtor.New": string;
  "Debtor.Edit": string;
  "Debtors.New": string;
  Organization: string;
  Email: string;
  Telephone: string;
  Address: string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): TravellerServiceResource {
  const resource = resources.DebtorsService?.texts;
  const uiResource = resources.AbpUi?.texts;
  return {
    new: resource?.new || data[lang]?.new || data.en.new,
    Edit: uiResource?.Edit || data[lang]?.Edit || data.en.Edit,
    Delete: uiResource?.Delete || data[lang]?.Delete || data.en.Delete,
    Debtors: resource?.Debtors || data[lang]?.Debtors || data.en.Debtors,
    Debtor: resource?.Debtor || data[lang]?.Debtor || data.en.Debtor,
    Organization:
      resource?.Organization ||
      data[lang]?.Organization ||
      data.en.Organization,
    Email: resource?.Email || data[lang]?.Email || data.en.Email,
    Telephone:
      resource?.Telephone || data[lang]?.Telephone || data.en.Telephone,
    Address: resource?.Address || data[lang]?.Address || data.en.Address,
    Save: resource?.Save || data[lang]?.Save || data.en.Save,
    "Debtor.New":
      resource?.["Debtor.New"] ||
      data[lang]?.["Debtor.New"] ||
      data.en["Debtor.New"],
    "Debtor.Edit":
      resource?.["Debtor.Edit"] ||
      data[lang]?.["Debtor.Edit"] ||
      data.en["Debtor.Edit"],
    "Debtor.Description":
      resource?.["Debtor.Description"] ||
      data[lang]?.["Debtor.Description"] ||
      data.en["Debtor.Description"],
    "Debtors.New":
      resource?.["Debtors.New"] ||
      data[lang]?.["Debtors.New"] ||
      data.en["Debtors.New"],
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
