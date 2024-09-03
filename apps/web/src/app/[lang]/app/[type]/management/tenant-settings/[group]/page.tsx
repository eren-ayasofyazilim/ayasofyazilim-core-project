"use server";

import type { UniRefund_SettingService_CountrySettings_CountrySettingDto } from "@ayasofyazilim/saas/SettingService";
import { getSettingServiceClient } from "src/lib";
import { getLocalizationResources } from "src/utils";
import TenantSettingsPage from "./group";
import { mockSettingsResponse } from "./mock-settings-response";

export default async function Page({
  params,
}: {
  params: { group: string; lang: string };
}) {
  const group = params.group;
  const lang = params.lang;

  let tenantSettings: UniRefund_SettingService_CountrySettings_CountrySettingDto;
  try {
    const client = await getSettingServiceClient();
    tenantSettings =
      await client.countrySetting.getApiSettingServiceCountrySettings();
  } catch (e) {
    tenantSettings = mockSettingsResponse;
  }
  const resources = await getLocalizationResources(lang);
  return (
    <TenantSettingsPage
      list={tenantSettings}
      path={group}
      resources={resources}
    />
  );
}
