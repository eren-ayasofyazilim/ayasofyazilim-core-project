"use server";

import { SettingServiceClient } from "@ayasofyazilim/saas/SettingService";
import Form from "./form";
import { getLocalizationResources } from "src/utils";

export default async function Page({
  params,
}: {
  params: { group: string; lang: string };
}) {
  const group = params.group;
  const lang = params.lang;
  const appClient = new SettingServiceClient({
    BASE: "http://192.168.1.105:44515",
  });
  const groupDto =
    await appClient.countrySetting.getApiSettingServiceCountrySettings();
  const resources = await getLocalizationResources(lang);
  return <Form list={groupDto} resources={resources} path={group} />;
}
