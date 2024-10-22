"use server";

import type {
  GetApiLocationServiceCitiesData,
  GetApiLocationServiceCountriesData,
} from "@ayasofyazilim/saas/LocationService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getCountriesApi(
  data: GetApiLocationServiceCountriesData = {},
) {
  try {
    const requests = getApiRequests();
    return {
      type: "success",
      data: await (await requests).locations.getCountries(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function getCitiesApi(data: GetApiLocationServiceCitiesData = {}) {
  try {
    const requests = getApiRequests();
    return {
      type: "success",
      data: await (await requests).locations.getCities(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
