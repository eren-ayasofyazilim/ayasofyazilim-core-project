"use server";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import { Button } from "@/components/ui/button";
import { getBacker } from "../actions";
import { formSchema } from "../data";
import { BackerForm } from "./form";

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
      <div className="container flex flex-col m-4 max-h-[90vh]">
          <BackerForm backer={backer} profileId={profileId} type={backer.type || type} />
      </div>
  );
}
