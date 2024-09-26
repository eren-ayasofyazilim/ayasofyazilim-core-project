"use server";

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
  if (!crmDetailData) {
    return <>Not found</>;
  }

  return (
    <>
      <Form crmDetailData={crmDetailData} params={params} />
      <div className="hidden" id="page-title">
        {crmDetailData.entityInformations?.[0]?.organizations?.[0]?.name}
      </div>
    </>
  );
}
