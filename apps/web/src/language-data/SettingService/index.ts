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
  Vat: string;
  "Vat.New": string;
  ProductGroup: string;
  "ProductGroup.New": string;
  ProductGroupVAT: string;
  "ProductGroupVAT.New": string;
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
    Vat: resource?.Vat || data[lang]?.Vat || data.en.Vat,
    "Vat.New":
      resource?.["Vat.New"] || data[lang]?.["Vat.New"] || data.en["Vat.New"],

    ProductGroup:
      resource?.ProductGroup ||
      data[lang]?.ProductGroup ||
      data.en.ProductGroup,
    "ProductGroup.New":
      resource?.["ProductGroup.New"] ||
      data[lang]?.["ProductGroup.New"] ||
      data.en["ProductGroup.New"],

    ProductGroupVAT:
      resource?.ProductGroupVAT ||
      data[lang]?.ProductGroupVAT ||
      data.en.ProductGroupVAT,
    "ProductGroupVAT.New":
      resource?.["ProductGroupVAT.New"] ||
      data[lang]?.["ProductGroupVAT.New"] ||
      data.en["ProductGroupVAT.New"],
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
