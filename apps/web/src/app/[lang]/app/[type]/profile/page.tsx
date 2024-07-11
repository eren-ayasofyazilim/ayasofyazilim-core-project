"use server";
import { Button } from "@/components/ui/button";
import { Building2Icon, User } from "lucide-react";
import Link from "next/link";
import { deleteBacker, getBackers, getBackersIndividuals } from "./actions";
import Form from "./form";

async function getBackerProfiles() {
  const _backerProfiles = [];
  const backersCompanies = await getBackers();
  const backersIndividual = (await getBackersIndividuals())?.[0];

  _backerProfiles.push({
    ...backersIndividual,
    icon: <User className="w-5 h-5" />,
  });
  backersCompanies.forEach((backer) => {
    _backerProfiles.push({
      ...backer,
      icon: <Building2Icon className="w-5 h-5" />,
    });
  });
  return _backerProfiles;
}

export default async function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const type = params.type;
  const backerProfiles = await getBackerProfiles();

  async function onDeleteClick(backerId: string) {
    "use server";
    await deleteBacker(backerId || "");
    return await getBackerProfiles();
  }
  return (
    <>
      <div className="flex justify-end flex-row mb-2">
        <Button asChild>
          <Link href="profile/new">New {type}</Link>
        </Button>
      </div>
      <Form initialData={backerProfiles} onDeleteClick={onDeleteClick} />
    </>
  );
}
