"use server";

import type { Volo_Abp_Application_Dtos_PagedResultDto_15 } from "@ayasofyazilim/saas/TravellerService";
import { getTravellersServiceClient, structuredError } from "src/lib";

export async function getTravellers() {
  try {
    const client = await getTravellersServiceClient();
    const response: Volo_Abp_Application_Dtos_PagedResultDto_15 =
      await client.traveller.getApiTravellerServiceTravellersGetProfileList();
    const { items, totalCount } = response;
    const _items = items?.map((item) => {
      return {
        ...item,
        ...item.personalIdentificationProfiles?.[0],
      };
    });
    return { items: _items, totalCount };
  } catch (error) {
    return structuredError(error);
  }
}
