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
  console.log("backer", backer);
  return (
    <ScrollArea>
      <div className="container flex flex-col m-4 max-h-[600px]">
        <div className="grid gap-4 py-4">
          <BackerForm type={type} backer={backer} profileId={profileId} />
        </div>
      </div>
    </ScrollArea>
  );
}
