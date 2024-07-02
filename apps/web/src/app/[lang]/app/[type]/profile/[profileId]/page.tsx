"use server";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import { BackerForm } from "./form";
import { getBacker } from "../actions";
import { formSchema } from "../data";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string; profileId: string };
}) {
  const { profileId, type } = params;
  let backer = {};
  if (profileId !== "new") {
    backer = await getBacker(profileId);
  }
  return (
      <div className="container flex flex-col m-4 max-h-[600px]">
          <BackerForm type={type} backer={backer} profileId={profileId} />
      </div>
  );
}
