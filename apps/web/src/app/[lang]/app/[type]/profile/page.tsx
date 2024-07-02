"use server";
import { Button } from "@/components/ui/button";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import CardList from "@repo/ayasofyazilim-ui/organisms/card-list";
import Link from "next/link";
import { deleteBacker, getBackers } from "./actions";
import { BackerList } from "./backerlist";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const type = params.type;
  const backers = await getBackers();

  return (
    <>
      <div className="flex-row mb-2">
        <Button asChild>
          <Link href={"profile/new"} className="float-right">
            New {type}
          </Link>
        </Button>
      </div>
      <ScrollArea>
        <BackerList backers={backers} />
      </ScrollArea>
    </>
  );
}
