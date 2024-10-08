"use server";

import { getResourceData } from "src/language-data/TravellerService";
import { getCities, getCountries } from "../../../action";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: { travellerId: string; lang: string };
}) {
  const { languageData } = await getResourceData(params.lang);

  const countries = (
    await getCountries({
      maxResultCount: 500,
      sorting: "name",
    })
  ).data;

  const countriesEnum =
    countries?.items?.map((item) => ({
      name: item.name || "",
      code2: item.code2 || "",
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
      countriesEnum={countriesEnum}
      languageData={languageData}
    />
  );
}
