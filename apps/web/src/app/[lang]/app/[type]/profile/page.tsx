"use client";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import CardList from "@repo/ayasofyazilim-ui/organisms/card-list";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import { createZodObject, getBaseLink } from "src/utils";
import { z } from "zod";
import { $UpwithCrowd_BackerService_Organizations_CreateOrganizationDto } from "@ayasofyazilim/saas/BackerService";
import AutoformDialog from "@repo/ayasofyazilim-ui/molecules/dialog";
import { Button } from "@/components/ui/button";
import { postBacker, getBackers } from "./actions";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";

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
  const createBacker = $UpwithCrowd_BackerService_Organizations_CreateOrganizationDto;
  const backerZod = createZodObject(createBacker, Object.keys(createBacker.properties));
  const formSchema = {
    admin: backerZod,
    user: z.object({
      name: z.string(),
      surname: z.string(),
      phoneNumber: z.string(),
      address: z.string(),
      email: z.string().email(),
    }),
    entreperneur: z.object({
      name: z.string(),
      surname: z.string(),
      companyName: z.string(),
      phoneNumber: z.string(),
      email: z.string().email(),
    }),
    investor: backerZod,
  };
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
        <Button onClick={() => setOpen(true)} className="float-right">New {type}</Button>
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
            };
          }) || []}
        ></CardList>
      </ScrollArea> : <></>}
    </div>
  );
}
