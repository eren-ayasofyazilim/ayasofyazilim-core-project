import { getResourceData } from "src/language-data/ContractService";
import RefundHeader from "./refund-header";

export default async function Page({
  params,
}: {
  params: { lang: string; id: string; type: string };
}): Promise<JSX.Element> {
  const { languageData } = await getResourceData(params.lang);
  return (
    <>
      <RefundHeader languageData={languageData} params={params} />
      <div className="hidden" id="page-title">
        {languageData["RefundTables.Edit.Title"]}
      </div>
      <div className="hidden" id="page-description">
        {languageData["RefundTables.Edit.Description"]}
      </div>
    </>
  );
}
