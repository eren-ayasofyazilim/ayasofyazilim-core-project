"use server";

import { getResourceData } from "src/language-data/CRMService";
import type { PartyNameType } from "../../table-data";
import { getCities, getPartyTableData } from "../action";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: {
    partyName: PartyNameType;
    lang: string;
  };
}) {
  const { languageData } = await getResourceData(params.lang);
  const taxOffices = (await getPartyTableData("tax-offices", 0, 100)).data;
  const taxOfficesEnum =
    taxOffices?.items?.map((item) => ({
      name: item.name || "",
      id: item.id || "",
    })) || [];

  const cities = (await getCities({ maxResultCount: 500, sorting: "name" }))
    .data;
  const citiesEnum =
    cities?.items?.map((item) => ({
      name: item.name || "",
      id: item.id || "",
    })) || [];

  return (
    <Form
      citiesEnum={citiesEnum}
      languageData={languageData}
      partyName={params.partyName}
      taxOfficesEnum={taxOfficesEnum}
    />
  );
}
