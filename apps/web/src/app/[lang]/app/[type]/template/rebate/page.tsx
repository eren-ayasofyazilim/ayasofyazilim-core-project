"use server";
import React from "react";
import { getResourceData } from "src/language-data/ContractService";
import Rebate from "./rebate";

export default async function Page({
  params,
}: {
  params: { group: string; lang: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  return <Rebate languageData={languageData} />;
}
