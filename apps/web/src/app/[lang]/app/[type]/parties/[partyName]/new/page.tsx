"use server";

import { getTableData } from "src/app/[lang]/app/actions/api-requests";
import { getResourceData } from "src/language-data/CRMService";
import { getCities } from "../../../action";
import type { PartyNameType } from "../../types";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: {
    partyName: Exclude<PartyNameType, "individuals">;
    lang: string;
  };
}) {
  const { languageData } = await getResourceData(params.lang);

  const cities = await getCities({ maxResultCount: 500, sorting: "name" });
  const citiesEnum =
    (cities.type === "success" &&
      cities.data.items?.map((item) => ({
        name: item.name || "",
        id: item.id || "",
      }))) ||
    [];

  const taxOffices = await getTableData("tax-offices", 0);
  const taxOfficesEnum =
    (taxOffices.type === "success" &&
      taxOffices.data.items?.map((item) => ({
        name: item.name || "",
        id: item.id || "",
      }))) ||
    [];

  return (
    <Form
      citiesEnum={citiesEnum}
      languageData={languageData}
      partyName={params.partyName}
      taxOfficesEnum={taxOfficesEnum}
    />
  );
}
