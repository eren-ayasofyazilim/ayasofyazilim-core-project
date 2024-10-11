"use server";
import { getResourceData } from "src/language-data/TravellerService";
import Table from "./table";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  return <Table languageData={languageData} />;
}
