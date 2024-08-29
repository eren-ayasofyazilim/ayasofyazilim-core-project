"use server";
// import { getResourceData } from "src/language-data/ContractService";
import TemplateDetails from "./template-details";

export default function Page({
  params,
}: {
  params: { lang: string; type: string; id: string };
}) {
  // const { languageData } = await getResourceData(params.lang);
  return <TemplateDetails templateId={params.id} />;
}
