import { getBaseLink } from "src/utils";

export default function Page({
  params,
}: {
  params: { contractId: string; partyName: string; partyId: string };
}): JSX.Element {
  return (
    <>
      <div>{params.contractId}</div>
      <div className="hidden" id="page-title">
        Edit Contract - {params.contractId}
      </div>
      <div className="hidden" id="page-description">
        You can edit contract from here.
      </div>
      <div className="hidden" id="page-back-link">
        {getBaseLink(
          `/app/admin/parties/${params.partyName}/${params.partyId}`,
        )}
      </div>
    </>
  );
}
