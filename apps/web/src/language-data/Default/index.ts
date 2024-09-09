import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface DefaultResource {
  "FileUploader.CannotUploadMoreThanOne": string;
  "FileUploader.CannotUploadMoreThan{0}": string;
  "FileUploader.RejectedFile {0}": string;
  "FileUploader.Files": string;
  "FileUploader.File": string;
  "FileUploader.Uploading{0}": string;
  "FileUploader.{0}Uploaded": string;
  "FileUploader.FailedToUpload{0}": string;
  "FileUploader.DropTheFilesHere": string;
  "FileUploader.DragAndDropFilesHere": string;
  "FileUploader.YouCanUpload{0}files{1}each": string;
  "FileUploader.RemoveFile": string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): DefaultResource {
  const resource = resources.Default?.texts;
  return {
    "FileUploader.CannotUploadMoreThanOne":
      resource?.["FileUploader.CannotUploadMoreThanOne"] ||
      data[lang]?.["FileUploader.CannotUploadMoreThanOne"] ||
      data.en["FileUploader.CannotUploadMoreThanOne"],
    "FileUploader.CannotUploadMoreThan{0}":
      resource?.["FileUploader.CannotUploadMoreThan{0}"] ||
      data[lang]?.["FileUploader.CannotUploadMoreThan{0}"] ||
      data.en["FileUploader.CannotUploadMoreThan{0}"],
    "FileUploader.RejectedFile {0}":
      resource?.["FileUploader.RejectedFile {0}"] ||
      data[lang]?.["FileUploader.RejectedFile {0}"] ||
      data.en["FileUploader.RejectedFile {0}"],
    "FileUploader.Files":
      resource?.["FileUploader.Files"] ||
      data[lang]?.["FileUploader.Files"] ||
      data.en["FileUploader.Files"],
    "FileUploader.File":
      resource?.["FileUploader.File"] ||
      data[lang]?.["FileUploader.File"] ||
      data.en["FileUploader.File"],
    "FileUploader.Uploading{0}":
      resource?.["FileUploader.Uploading{0}"] ||
      data[lang]?.["FileUploader.Uploading{0}"] ||
      data.en["FileUploader.Uploading{0}"],
    "FileUploader.{0}Uploaded":
      resource?.["FileUploader.{0}Uploaded"] ||
      data[lang]?.["FileUploader.{0}Uploaded"] ||
      data.en["FileUploader.{0}Uploaded"],
    "FileUploader.FailedToUpload{0}":
      resource?.["FileUploader.FailedToUpload{0}"] ||
      data[lang]?.["FileUploader.FailedToUpload{0}"] ||
      data.en["FileUploader.FailedToUpload{0}"],
    "FileUploader.DropTheFilesHere":
      resource?.["FileUploader.DropTheFilesHere"] ||
      data[lang]?.["FileUploader.DropTheFilesHere"] ||
      data.en["FileUploader.DropTheFilesHere"],
    "FileUploader.DragAndDropFilesHere":
      resource?.["FileUploader.DragAndDropFilesHere"] ||
      data[lang]?.["FileUploader.DragAndDropFilesHere"] ||
      data.en["FileUploader.DragAndDropFilesHere"],
    "FileUploader.YouCanUpload{0}files{1}each":
      resource?.["FileUploader.YouCanUpload{0}files{1}each"] ||
      data[lang]?.["FileUploader.YouCanUpload{0}files{1}each"] ||
      data.en["FileUploader.YouCanUpload{0}files{1}each"],
    "FileUploader.RemoveFile":
      resource?.["FileUploader.RemoveFile"] ||
      data[lang]?.["FileUploader.RemoveFile"] ||
      data.en["FileUploader.RemoveFile"],
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
