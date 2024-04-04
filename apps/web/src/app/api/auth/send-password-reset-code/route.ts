"use server";
import { ForgotPasswordFormDataType } from "@repo/ayasofyazilim-ui/molecules/forms/forgot-password-form";
import { NextRequest } from "next/server";

export async function POST(reqest: NextRequest) {
  const { email } = (await reqest.json()) as ForgotPasswordFormDataType;

  // get request body
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");

  const raw = JSON.stringify({
    email: email,
    appName: "MVC",
    returnUrl: "http://localhost:3000/",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch(
    "http://192.168.1.37:44399/api/account/send-password-reset-code",
    requestOptions
  );
}
