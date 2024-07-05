"use server";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { auth } from "auth";
import { getLocalizationResources } from "src/utils";
import { sectionItems } from "../sectionItems";
import ProfileForm from "./form";

export default async function Page({ params }: { params: { lang: string } }) {
  const resources = await getLocalizationResources(params.lang);
  const navigationSections = sectionItems.map((item) => {
    return {
      ...item,
      name: resources.AbpForDeploy.texts?.[item.name] ?? item.defaultName,
    };
  });

  const session = await auth();
  const user = session?.user;
  return (
    <SectionLayout
      content={<ProfileForm user={user} />}
      contentClassName="flex flex-col-reverse md:flex-row flex-wrap-reverse flex-1 lg:gap-16 md:gap-4 justify-center"
      defaultActiveSectionId="profile"
      openOnNewPage
      sections={navigationSections}
    />
  );
}
