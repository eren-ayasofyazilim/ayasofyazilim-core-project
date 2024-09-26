"use server";

import type {
  GetApiLocationServiceCitiesData,
  GetApiLocationServiceCountriesData,
  Volo_Abp_Application_Dtos_PagedResultDto_12,
  Volo_Abp_Application_Dtos_PagedResultDto_13,
} from "@ayasofyazilim/saas/LocationService";
import { revalidatePath } from "next/cache";
import type { ServerResponse } from "src/lib";
import { getLocationServiceClient, structuredError } from "src/lib";

export async function getCountries(body: GetApiLocationServiceCountriesData) {
  "use server";
  try {
    const client = await getLocationServiceClient();
    const response = await client.country.getApiLocationServiceCountries(body);
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_13>;
  } catch (error) {
    return structuredError(error);
  }
}

export async function getCities(body: GetApiLocationServiceCitiesData) {
  "use server";
  try {
    const client = await getLocationServiceClient();
    const response = await client.city.getApiLocationServiceCities(body);
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_12>;
  } catch (error) {
    return structuredError(error);
  }
}
