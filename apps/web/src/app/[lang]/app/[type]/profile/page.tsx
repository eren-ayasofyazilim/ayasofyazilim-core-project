"use client";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useSession } from "next-auth/react";
import { use, useEffect } from "react";
import { getBaseLink } from "src/utils";
import { z } from "zod";

export default function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const type = params.type;
  const session = useSession();

  const formSchema = {
    admin: z.object({
      name: z.string(),
      surname: z.string(),
      companyName: z.string(),
      informationNotes: z.string().optional(), // Assuming this field can be optional
      tc: z.string(), // Assuming TC is a string; adjust the validation as needed
      phoneNumber: z.string(), // Adjust validation as needed, e.g., regex for phone numbers
    }),
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
    investor: z.object({
      name: z.string(),
      surname: z.string(),
      companyName: z.string(),
      phoneNumber: z.string(),
      email: z.string().email(),
    }),
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
    <div>
      <h1>Page</h1>
      <div className="flex-1">profil + {type}</div>
      <AutoForm formSchema={formSchema[type]}></AutoForm>
    </div>
  );
}
