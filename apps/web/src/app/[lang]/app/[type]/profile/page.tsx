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

export default function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const [open, setOpen] = useState(false);
  const type = params.type;
  const session = useSession();
  const createBacker = $UpwithCrowd_BackerService_Organizations_CreateOrganizationDto;
  const backerZod = createZodObject(createBacker, ["name", "taxpayerId", "legalStatusCode" ]);
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

  useEffect(() => {
    async function getSession() {
      if (session.status !== "authenticated") return;
      let fetchConfig = await fetch(getBaseLink("api/config"));
      let config = await fetchConfig.json();
    }
    if (!!session.data) getSession();
  }, [session.data]);

  return (
    <div className="container flex flex-col m-4">
      <div className="flex-row mb-2">
        <Button onClick={() => setOpen(true)} className="float-right">New {type}</Button>
      </div>
      <AutoformDialog
        open={open}
        onOpenChange={setOpen}
        action={{
          cta: 'New ' + type,
          description: 'Add New ' + type,
          callback: () => {
            console.log('callback');
          },
          autoFormArgs: {
            formSchema: formSchema[type],
          },
        }}
      />
      <CardList
        cards={[
          {
            title: 'Profile',
            content: 'Ahmet Kaya',
            description: 'Comapny Name',
            footer: 'Your target is 100%',
          },
          {
            title: 'Profile',
            content: 'Ahmet Kaya',
            description: 'Comapny Name',
            footer: 'Your target is 100%',
          }, {
            title: 'Profile',
            content: 'Ahmet Kaya',
            description: 'Comapny Name',
            footer: 'Your target is 100%',
          }, {
            title: 'Profile',
            content: 'Ahmet Kaya',
            description: 'Comapny Name',
            footer: 'Your target is 100%',
          },
          {
            title: 'Profile',
            content: 'Ahmet Kaya',
            description: 'Comapny Name',
            footer: 'Your target is 100%',
          },
        ]}
      ></CardList>
    </div>
  );
}
