"use server";
import { Button } from "@/components/ui/button";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import CardList from "@repo/ayasofyazilim-ui/organisms/card-list";
import Link from "next/link";
import { deleteBacker, getBackers, getBackersIndividuals } from "./actions";
import { BackerList } from "./backerlist";
import { ScrollBar } from "@/components/ui/scroll-area";

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
      <ScrollArea>
        {/* <ScrollBar orientation="horizontal" /> */}
        <BackerList backers={backersComapnies} />
      </ScrollArea>
      <>Individuals</>
      <ScrollArea>
        {/* <ScrollBar orientation="horizontal" /> */}
        <BackerList backers={backersIndividuals} />
      </ScrollArea>
    </>
  );
}
