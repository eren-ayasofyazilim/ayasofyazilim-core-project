"use server";
import { NextRequest } from "next/server";

export async function GET(reqest: NextRequest) {
  // get request body
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`${process.env.BASE_URL}/api/account/logout`, requestOptions);
}
