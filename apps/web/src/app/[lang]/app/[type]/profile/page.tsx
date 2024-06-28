"use client";
import CardList from "@repo/ayasofyazilim-ui/organisms/card-list";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getBaseLink } from "src/utils";
import AutoformDialog from "@repo/ayasofyazilim-ui/molecules/dialog";
import { Button } from "@/components/ui/button";
import { postBacker, getBackers, deleteBacker, putBacker } from "./actions";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import Link from "next/link";
import { formSchema } from "./data";

export default function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [backers, setBackers] = useState<any[]>([]);
  const type = params.type;
  const session = useSession();

  async function updataBackers() {
    const backers = await getBackers();
    setBackers(backers);
    setLoading(false);
  }
  useEffect(() => {
    updataBackers()
  }, []);

  useEffect(() => {
    async function getSession() {
      if (session.status !== "authenticated") return;
      let fetchConfig = await fetch(getBaseLink("api/config"));
      let config = await fetchConfig.json();
    }
    if (!!session.data) getSession();
  }, [session.data]);

  return (
    <div className="container flex flex-col m-4 max-h-full">
      <div className="flex-row mb-2">
        <Button asChild>
          <Link href={"profile/new"} className="float-right">New {type}</Link>
        </Button>
      </div>
      <AutoformDialog
        open={open}
        onOpenChange={setOpen}
        action={{
          cta: 'New ' + type,
          description: 'Add New ' + type,
          callback: (e) => {
            postBacker(e);
            updataBackers();
          },
          autoFormArgs: {
            formSchema: formSchema[type],
          },
        }}
      />
      {backers.length > 0 ? <ScrollArea>
        <CardList
          isLoading={loading}
          cards={backers?.map((backer) => {
            return {
              title: backer.name || "",
              description: backer.taxpayerId || "",
              content: backer.legalStatusCode || "",
              footer: backer.customerNumber || "",
              onEdit: () => {
                console.log("edit", backer.backerId);
              },
              onDelete: async () => {
                console.log("delete", backer.backerId);
                await deleteBacker(backer.backerId);
                await updataBackers();
              },
            };
          }) || []}
        ></CardList>
      </ScrollArea> : <></>}
    </div>
  );
}
