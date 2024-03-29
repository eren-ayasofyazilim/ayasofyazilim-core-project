"use server";
import { LoginFormDataType } from "@repo/ayasofyazilim-ui/molecules/forms/login-form";
import { NextRequest } from "next/server";

export async function POST(reqest : NextRequest) {
  const { userIdentifier, password, tenantId } = await reqest.json() as LoginFormDataType;

  // get request body 
  const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Requested-With", "XMLHttpRequest");

    const raw = JSON.stringify({
        "userNameOrEmailAddress": userIdentifier,
        "password": password,
        "rememberMe": false,
        "tenanId": tenantId
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    return fetch("http://192.168.1.37:44399/api/account/login", requestOptions);
}
