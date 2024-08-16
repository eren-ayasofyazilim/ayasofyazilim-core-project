"use server";

import type { UniRefund_SettingService_CountrySettings_CountrySettingDto } from "@ayasofyazilim/saas/SettingService";
import { getSettingServiceClient } from "src/lib";
import { getLocalizationResources } from "src/utils";
import CountrySettingsPage from "./group";
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
    <CountrySettingsPage
      list={countrySettings}
      path={group}
      resources={resources}
    />
  );
}
