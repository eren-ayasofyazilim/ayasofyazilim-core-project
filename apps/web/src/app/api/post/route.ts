/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment -- TODO: we need to fix this*/
"use server";
import type { NextRequest } from "next/server";

export async function POST(reqest: NextRequest) {
  const { body, url } = (await reqest.json()) as {
    body: any;
    url: string;
  };
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("X-Requested-With", "XMLHttpRequest");

  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };
  return fetch(`${process.env.BASE_URL}/api/${url}`, requestOptions);
}
