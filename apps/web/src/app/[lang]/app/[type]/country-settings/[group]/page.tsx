"use server";

import { SettingsView } from "@repo/ui/settings-view";
import { getSettingServiceClient } from "src/lib";
import { getLocalizationResources } from "src/utils";
import { mockSettingsResponse } from "./mock-settings-response";
import { Card } from "@/components/ui/card";

export default async function Page({
  params,
}: {
  params: { group: string; lang: string };
}) {
  const group = params.group;
  const lang = params.lang;

  let countrySettings;
  try {
    countrySettings =
      await getSettingServiceClient().countrySetting.getApiSettingServiceCountrySettings();
  } catch (e) {
    countrySettings = mockSettingsResponse;
  }
  const resources = await getLocalizationResources(lang);
  return (
    <Card className="overflow-hidden h-full">
      <SettingsView list={countrySettings} path={group} resources={resources} />
    </Card>
  );
}
