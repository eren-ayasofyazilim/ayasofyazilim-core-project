"use server";

import { getResourceData } from "src/language-data/DebtorsService";
import { getDebtorDetailServer } from "../actions/action";
import Form from "./form";

async function getDebtorDetailData(data: string, id: string) {
  if (data === "debtors") {
    try {
      const response = (await getDebtorDetailServer({ id })).data;
      if ("merchant" in response) {
        return response.merchant;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
export default async function Page({
  params,
}: {
  params: {
    id: string;
    data: string;
    lang: string;
  };
}) {
  const crmDetailData = await getDebtorDetailData("debtors", params.id);
  const { languageData } = await getResourceData(params.lang);

  if (!crmDetailData) {
    return <>Not found</>;
  }

  return (
    <>
      <Form crmDetailData={crmDetailData} params={params} />
      <div className="hidden" id="page-title">
        {`${languageData.Debtors} - ${crmDetailData.entityInformations?.[0]?.organizations?.[0]?.name}`}
      </div>
      <div className="hidden" id="page-description">
        {languageData["Debtors.Description"]}
      </div>
    </>
  );
}
