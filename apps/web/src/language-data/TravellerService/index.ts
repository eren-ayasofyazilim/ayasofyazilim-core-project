import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface TravellerServiceResource {
  Traveller: string;
  "Traveller.Description": string;
  "Traveller.Delete.Succes": string;
  "Traveller.Delete.Error": string;
  "Traveller.New": string;
  "Traveller.Edit": string;
  "Traveller.Save": string;
  "Traveller.New.Succes": string;
  "Traveller.New.Error": string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): TravellerServiceResource {
  const resource = resources.TravellerService?.texts;
  return {
    Traveller:
      resource?.Traveller || data[lang]?.Traveller || data.en.Traveller,
    "Traveller.Description":
      resource?.["Traveller.Description"] ||
      data[lang]?.["Traveller.Description"] ||
      data.en["Traveller.Description"],
    "Traveller.Delete.Succes":
      resource?.["Traveller.Delete.Succes"] ||
      data[lang]?.["Traveller.Delete.Succes"] ||
      data.en["Traveller.Delete.Succes"],
    "Traveller.Delete.Error":
      resource?.["Traveller.Delete.Error"] ||
      data[lang]?.["Traveller.Delete.Error"] ||
      data.en["Traveller.Delete.Error"],
    "Traveller.New":
      resource?.["Traveller.New"] ||
      data[lang]?.["Traveller.New"] ||
      data.en["Traveller.New"],
    "Traveller.Edit":
      resource?.["Traveller.Edit"] ||
      data[lang]?.["Traveller.Edit"] ||
      data.en["Traveller.Edit"],
    "Traveller.Save":
      resource?.["Traveller.Save"] ||
      data[lang]?.["Traveller.Save"] ||
      data.en["Traveller.Save"],
    "Traveller.New.Succes":
      resource?.["Traveller.New.Succes"] ||
      data[lang]?.["Traveller.New.Succes"] ||
      data.en["Traveller.New.Succes"],
    "Traveller.New.Error":
      resource?.["Traveller.New.Error"] ||
      data[lang]?.["Traveller.New.Error"] ||
      data.en["Traveller.New.Error"],
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
