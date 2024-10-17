import { getBaseLink } from "src/utils";
import { tableDataRequests } from "src/app/[lang]/app/actions/table";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getResourceData } from "src/language-data/ContractService";
import ContractHeaderForm from "./form";

export default async function Page({
  params,
}: {
  params: {
    partyName: "merchants";
    partyId: string;
    lang: string;
  };
}) {
  const req = await tableDataRequests();
  const basicInformation = await req[params.partyName].getBasicInformation({
    id: params.partyId,
  });
  const addresses = await req[params.partyName].getAdresses({
    id: params.partyId,
  });
  const { languageData } = await getResourceData(params.lang);
  return (
    <>
      <ContractHeaderForm
        languageData={languageData}
        params={params}
        addresses={addresses}
        // basicInformation={basicInformation}
      />
      <PageHeader
        languageData={languageData}
        params={params}
        title={basicInformation.name || params.partyId}
      />
    </>
  );
}

function PageHeader({
  params,
  title,
  languageData,
}: {
  params: { partyName: string; partyId: string };
  title: string;
  languageData: ContractServiceResource;
}) {
  return (
    <>
      <div className="hidden" id="page-title">
        {languageData["Contracts.Create.Title"]} - {title}
      </div>
      <div className="hidden" id="page-description">
        {languageData["Contracts.Create.Description"]}
      </div>
      <div className="hidden" id="page-back-link">
        {getBaseLink(
          `/app/admin/parties/${params.partyName}/${params.partyId}`,
        )}
      </div>
    </>
  );
}
