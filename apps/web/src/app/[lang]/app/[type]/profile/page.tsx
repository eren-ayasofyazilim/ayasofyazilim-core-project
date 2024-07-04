"use server";
import { Button } from "@/components/ui/button";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import Link from "next/link";
import { getBackers, getBackersIndividuals } from "./actions";
import { BackerList } from "./backerlist";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const type = params.type;
  const backersComapnies = await getBackers();
  const backersIndividuals = await getBackersIndividuals();

  return (
    <>
      <div className="flex-row mb-2">
        <Button asChild>
          <Link href={"profile/new"} className="float-right">
            New {type}
          </Link>
        </Button>
      </div>
      <>Companies</>
      <ScrollArea className="p-2 border-2">
        {/* <ScrollBar orientation="horizontal" /> */}
        <BackerList backers={backersComapnies} type="companies" />
      </ScrollArea>
      <>Individuals</>
      <ScrollArea className="p-2 border-2">
        {/* <ScrollBar orientation="horizontal" /> */}
        <BackerList backers={backersIndividuals} type="individuals" />
      </ScrollArea>
    </>
  );
}
