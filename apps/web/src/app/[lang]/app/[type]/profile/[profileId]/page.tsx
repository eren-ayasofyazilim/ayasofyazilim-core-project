"use server";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { getBacker } from "../actions";
import { BackerForm } from "./form";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string; profileId: string };
}) {
  const { profileId, type } = params;
  const backer = profileId === "new" ? { type } : await getBacker(profileId);

  return (
    <>
      <PageHeader
        description={
          profileId === "new"
            ? "Buradan yeni bir yatırım profili oluşturabilirsiniz."
            : "Yatırımcı profilinizi buradan düzenleyebilirsiniz."
        }
        title={profileId === "new" ? "Profil Oluştur" : "Profilini Düzenle"}
      />

      <BackerForm
        backer={backer}
        formType={backer?.type || type}
        profileId={profileId}
      />
    </>
  );
}
