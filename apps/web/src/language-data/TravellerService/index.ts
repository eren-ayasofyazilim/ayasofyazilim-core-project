import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface TravellerServiceResource {
  Travellers: string;
  "Travellers.Description": string;
  "Travellers.Delete.Succes": string;
  "Travellers.Delete.Error": string;
  "Travellers.New": string;
  "Travellers.Edit": string;
  "Travellers.Save": string;
  "Travellers.New.Succes": string;
  "Travellers.New.Error": string;

  "Form.name": string;
  "Form.email": string;
  "Form.telephone": string;
  "Form.personalSummaries": string;
  "Form.address": string;
  "Form.personalIdentificationCommonDatas": string;
  "Form.personalPreferencesTypes": string;
  "Form.name.firstName": string;
  "Form.name.lastName": string;
  "Form.email.emailAddress": string;
  "Form.email.typeCode": string;
  "Form.telephone.localNumber": string;
  "Form.telephone.typeCode": string;
  "Form.personalSummaries.date": string;
  "Form.personalSummaries.birthDate": string;
  "Form.personalSummaries.ethnicity": string;
  "Form.personalSummaries.maritalStatusCode": string;
  "Form.personalSummaries.religiousAffiliationName": string;
  "Form.personalSummaries.genderTypeCode": string;
  "Form.address.country": string;
  "Form.address.terriority": string;
  "Form.address.city": string;
  "Form.address.postalCode": string;
  "Form.address.addressLine": string;
  "Form.address.fullAddress": string;
  "Form.address.typeCode": string;
  "Form.personalIdentificationCommonDatas.firstName": string;
  "Form.personalIdentificationCommonDatas.lastName": string;
  "Form.personalIdentificationCommonDatas.travelDocumentNumber": string;
  "Form.personalIdentificationCommonDatas.birthDate": string;
  "Form.personalIdentificationCommonDatas.issueDate": string;
  "Form.personalIdentificationCommonDatas.expirationDate": string;
  "Form.personalIdentificationCommonDatas.typeCode": string;
  "Form.personalIdentificationCommonDatas.residenceCountryCode2": string;
  "Form.personalIdentificationCommonDatas.nationalityCountryCode2": string;
  "Form.personalIdentificationCommonDatas.identificationType": string;
  "Form.personalPreferencesTypes.languagePreferenceCode": string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): TravellerServiceResource {
  const resource = resources.TravellerService?.texts;
  return {
    Travellers:
      resource?.Travellers || data[lang]?.Travellers || data.en.Travellers,
    "Travellers.Description":
      resource?.["Travellers.Description"] ||
      data[lang]?.["Travellers.Description"] ||
      data.en["Travellers.Description"],
    "Travellers.Delete.Succes":
      resource?.["Travellers.Delete.Succes"] ||
      data[lang]?.["Travellers.Delete.Succes"] ||
      data.en["Travellers.Delete.Succes"],
    "Travellers.Delete.Error":
      resource?.["Travellers.Delete.Error"] ||
      data[lang]?.["Travellers.Delete.Error"] ||
      data.en["Travellers.Delete.Error"],
    "Travellers.New":
      resource?.["Travellers.New"] ||
      data[lang]?.["Travellers.New"] ||
      data.en["Travellers.New"],
    "Travellers.Edit":
      resource?.["Travellers.Edit"] ||
      data[lang]?.["Travellers.Edit"] ||
      data.en["Travellers.Edit"],
    "Travellers.Save":
      resource?.["Travellers.Save"] ||
      data[lang]?.["Travellers.Save"] ||
      data.en["Travellers.Save"],
    "Travellers.New.Succes":
      resource?.["Travellers.New.Succes"] ||
      data[lang]?.["Travellers.New.Succes"] ||
      data.en["Travellers.New.Succes"],
    "Travellers.New.Error":
      resource?.["Travellers.New.Error"] ||
      data[lang]?.["Travellers.New.Error"] ||
      data.en["Travellers.New.Error"],

    "Form.name":
      resource?.["Form.name"] ||
      data[lang]?.["Form.name"] ||
      data.en["Form.name"],
    "Form.email":
      resource?.["Form.email"] ||
      data[lang]?.["Form.email"] ||
      data.en["Form.email"],
    "Form.telephone":
      resource?.["Form.telephone"] ||
      data[lang]?.["Form.telephone"] ||
      data.en["Form.telephone"],
    "Form.personalSummaries":
      resource?.["Form.personalSummaries"] ||
      data[lang]?.["Form.personalSummaries"] ||
      data.en["Form.personalSummaries"],
    "Form.address":
      resource?.["Form.address"] ||
      data[lang]?.["Form.address"] ||
      data.en["Form.address"],
    "Form.personalIdentificationCommonDatas":
      resource?.["Form.personalIdentificationCommonDatas"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas"] ||
      data.en["Form.personalIdentificationCommonDatas"],
    "Form.personalPreferencesTypes":
      resource?.["Form.personalPreferencesTypes"] ||
      data[lang]?.["Form.personalPreferencesTypes"] ||
      data.en["Form.personalPreferencesTypes"],
    "Form.name.firstName":
      resource?.["Form.name.firstName"] ||
      data[lang]?.["Form.name.firstName"] ||
      data.en["Form.name.firstName"],
    "Form.name.lastName":
      resource?.["Form.name.lastName"] ||
      data[lang]?.["Form.name.lastName"] ||
      data.en["Form.name.lastName"],
    "Form.email.emailAddress":
      resource?.["Form.email.emailAddress"] ||
      data[lang]?.["Form.email.emailAddress"] ||
      data.en["Form.email.emailAddress"],
    "Form.email.typeCode":
      resource?.["Form.email.typeCode"] ||
      data[lang]?.["Form.email.typeCode"] ||
      data.en["Form.email.typeCode"],
    "Form.telephone.localNumber":
      resource?.["Form.telephone.localNumber"] ||
      data[lang]?.["Form.telephone.localNumber"] ||
      data.en["Form.telephone.localNumber"],
    "Form.telephone.typeCode":
      resource?.["Form.telephone.typeCode"] ||
      data[lang]?.["Form.telephone.typeCode"] ||
      data.en["Form.telephone.typeCode"],
    "Form.personalSummaries.date":
      resource?.["Form.personalSummaries.date"] ||
      data[lang]?.["Form.personalSummaries.date"] ||
      data.en["Form.personalSummaries.date"],
    "Form.personalSummaries.birthDate":
      resource?.["Form.personalSummaries.birthDate"] ||
      data[lang]?.["Form.personalSummaries.birthDate"] ||
      data.en["Form.personalSummaries.birthDate"],
    "Form.personalSummaries.ethnicity":
      resource?.["Form.personalSummaries.ethnicity"] ||
      data[lang]?.["Form.personalSummaries.ethnicity"] ||
      data.en["Form.personalSummaries.ethnicity"],
    "Form.personalSummaries.religiousAffiliationName":
      resource?.["Form.personalSummaries.religiousAffiliationName"] ||
      data[lang]?.["Form.personalSummaries.religiousAffiliationName"] ||
      data.en["Form.personalSummaries.religiousAffiliationName"],
    "Form.personalSummaries.genderTypeCode":
      resource?.["Form.personalSummaries.genderTypeCode"] ||
      data[lang]?.["Form.personalSummaries.genderTypeCode"] ||
      data.en["Form.personalSummaries.genderTypeCode"],
    "Form.personalSummaries.maritalStatusCode":
      resource?.["Form.personalSummaries.maritalStatusCode"] ||
      data[lang]?.["Form.personalSummaries.maritalStatusCode"] ||
      data.en["Form.personalSummaries.maritalStatusCode"],
    "Form.address.country":
      resource?.["Form.address.country"] ||
      data[lang]?.["Form.address.country"] ||
      data.en["Form.address.country"],
    "Form.address.terriority":
      resource?.["Form.address.terriority"] ||
      data[lang]?.["Form.address.terriority"] ||
      data.en["Form.address.terriority"],
    "Form.address.city":
      resource?.["Form.address.city"] ||
      data[lang]?.["Form.address.city"] ||
      data.en["Form.address.city"],
    "Form.address.postalCode":
      resource?.["Form.address.postalCode"] ||
      data[lang]?.["Form.address.postalCode"] ||
      data.en["Form.address.postalCode"],
    "Form.address.addressLine":
      resource?.["Form.address.addressLine"] ||
      data[lang]?.["Form.address.addressLine"] ||
      data.en["Form.address.addressLine"],
    "Form.address.fullAddress":
      resource?.["Form.address.fullAddress"] ||
      data[lang]?.["Form.address.fullAddress"] ||
      data.en["Form.address.fullAddress"],
    "Form.address.typeCode":
      resource?.["Form.address.typeCode"] ||
      data[lang]?.["Form.address.typeCode"] ||
      data.en["Form.address.typeCode"],
    "Form.personalIdentificationCommonDatas.firstName":
      resource?.["Form.personalIdentificationCommonDatas.firstName"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas.firstName"] ||
      data.en["Form.personalIdentificationCommonDatas.firstName"],
    "Form.personalIdentificationCommonDatas.lastName":
      resource?.["Form.personalIdentificationCommonDatas.lastName"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas.lastName"] ||
      data.en["Form.personalIdentificationCommonDatas.lastName"],
    "Form.personalIdentificationCommonDatas.travelDocumentNumber":
      resource?.[
        "Form.personalIdentificationCommonDatas.travelDocumentNumber"
      ] ||
      data[lang]?.[
        "Form.personalIdentificationCommonDatas.travelDocumentNumber"
      ] ||
      data.en["Form.personalIdentificationCommonDatas.travelDocumentNumber"],
    "Form.personalIdentificationCommonDatas.birthDate":
      resource?.["Form.personalIdentificationCommonDatas.birthDate"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas.birthDate"] ||
      data.en["Form.personalIdentificationCommonDatas.birthDate"],
    "Form.personalIdentificationCommonDatas.issueDate":
      resource?.["Form.personalIdentificationCommonDatas.issueDate"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas.issueDate"] ||
      data.en["Form.personalIdentificationCommonDatas.issueDate"],
    "Form.personalIdentificationCommonDatas.expirationDate":
      resource?.["Form.personalIdentificationCommonDatas.expirationDate"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas.expirationDate"] ||
      data.en["Form.personalIdentificationCommonDatas.expirationDate"],
    "Form.personalIdentificationCommonDatas.typeCode":
      resource?.["Form.personalIdentificationCommonDatas.typeCode"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas.typeCode"] ||
      data.en["Form.personalIdentificationCommonDatas.typeCode"],
    "Form.personalIdentificationCommonDatas.residenceCountryCode2":
      resource?.[
        "Form.personalIdentificationCommonDatas.residenceCountryCode2"
      ] ||
      data[lang]?.[
        "Form.personalIdentificationCommonDatas.residenceCountryCode2"
      ] ||
      data.en["Form.personalIdentificationCommonDatas.residenceCountryCode2"],
    "Form.personalIdentificationCommonDatas.nationalityCountryCode2":
      resource?.[
        "Form.personalIdentificationCommonDatas.nationalityCountryCode2"
      ] ||
      data[lang]?.[
        "Form.personalIdentificationCommonDatas.nationalityCountryCode2"
      ] ||
      data.en["Form.personalIdentificationCommonDatas.nationalityCountryCode2"],
    "Form.personalIdentificationCommonDatas.identificationType":
      resource?.["Form.personalIdentificationCommonDatas.identificationType"] ||
      data[lang]?.[
        "Form.personalIdentificationCommonDatas.identificationType"
      ] ||
      data.en["Form.personalIdentificationCommonDatas.identificationType"],
    "Form.personalPreferencesTypes.languagePreferenceCode":
      resource?.["Form.personalPreferencesTypes.languagePreferenceCode"] ||
      data[lang]?.["Form.personalPreferencesTypes.languagePreferenceCode"] ||
      data.en["Form.personalPreferencesTypes.languagePreferenceCode"],
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
