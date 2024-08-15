"use server";

import { SettingsView } from "@repo/ui/settings-view";
import { Card } from "@/components/ui/card";
import type { UniRefund_SettingService_CountrySettings_CountrySettingDto } from "@ayasofyazilim/saas/SettingService";
import { getSettingServiceClient } from "src/lib";
import { getLocalizationResources } from "src/utils";
import { mockSettingsResponse } from "./mock-settings-response";

export default async function Page({
  params,
}: {
  params: { group: string; lang: string };
}) {
  const group = params.group;
  const lang = params.lang;

  let countrySettings: UniRefund_SettingService_CountrySettings_CountrySettingDto;
  try {
    const client = await getSettingServiceClient();
    countrySettings =
      await client.countrySetting.getApiSettingServiceCountrySettings();
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
