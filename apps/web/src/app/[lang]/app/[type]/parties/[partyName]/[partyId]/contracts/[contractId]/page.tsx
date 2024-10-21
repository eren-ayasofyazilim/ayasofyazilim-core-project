import { getResourceData } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import { getMerchantContractHeaderById } from "../action";
import Details from "./details";

export default async function Page({
  params,
}: {
  params: {
    contractId: string;
    partyName: "merchants";
    partyId: string;
    lang: string;
  };
}) {
  const contractHeaderDetails = await getMerchantContractHeaderById({
    id: params.contractId,
  });
  if (contractHeaderDetails.type !== "success") {
    return <>XS</>;
  }

  const { languageData } = await getResourceData(params.lang);
  return (
    <>
      <Details
        contractHeaderDetails={contractHeaderDetails.data}
        languageData={languageData}
        partyId={params.partyId}
        partyName={params.partyName}
      />
      <div className="hidden" id="page-title">
        {languageData["Contracts.Edit.Title"]} - (
        {contractHeaderDetails.data.name})
      </div>
      <div className="hidden" id="page-description">
        {languageData["Contracts.Edit.Description"]}
      </div>
      <div className="hidden" id="page-back-link">
        {getBaseLink(
          `/app/admin/parties/${params.partyName}/${params.partyId}`,
        )}
      </div>
    </>
  );
}
