"use server";

import { getResourceData } from "src/language-data/DebtorsService";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: {
    lang: string;
    id: string;
  };
}) {
  const { languageData } = await getResourceData(params.lang);

  return (
    <>
      <Form params={params} />
      <div className="hidden" id="page-title">
        {languageData["Debtor.New"]}
      </div>
      <div className="hidden" id="page-description">
        {languageData["Debtor.New"]}
      </div>
    </>
  );
}
