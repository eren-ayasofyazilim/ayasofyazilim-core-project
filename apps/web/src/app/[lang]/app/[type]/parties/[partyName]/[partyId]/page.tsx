"use server";

import { getResourceData } from "src/language-data/CRMService";
import { getCities } from "../../../action";
import type { PartyNameType } from "../../table-data";
import { dataConfigOfParties } from "../../table-data";
import { getPartyDetail } from "../action";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: {
    partyId: string;
    partyName: PartyNameType;
    lang: string;
  };
}) {
  const { languageData } = await getResourceData(params.lang);
  const formData = dataConfigOfParties[params.partyName];
  const partyDetail = await getPartyDetail(params.partyName, params.partyId);
  const cities = await getCities({ maxResultCount: 500, sorting: "name" });

  if (
    partyDetail.type !== "success" ||
    !partyDetail.data ||
    cities.type !== "success"
  ) {
    return <>Not found</>;
  }

  const partyDetailData = partyDetail.data;
  const citiesEnum =
    cities.data.items?.map((item) => ({
      name: item.name || "",
      id: item.id || "",
    })) || [];

  return (
    <>
      <Form
        citiesEnum={citiesEnum}
        params={params}
        partyDetailData={partyDetailData}
      />
      <div className="hidden" id="page-title">
        {`${languageData[formData.translationKey as keyof typeof languageData]} (${partyDetailData.entityInformations?.[0]?.organizations?.[0]?.name})`}
      </div>
    </>
  );
}
