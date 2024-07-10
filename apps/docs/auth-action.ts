import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
const BASE_URL = process.env.BASE_URL;
const TOKEN_URL = BASE_URL + "/connect/token";
const OPENID_URL = process.env.BASE_URL + "/.well-known/openid-configuration";

export async function getMyProfile(token: any) {
  const client = new AccountServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return await client.profile.getApiAccountMyProfile();
}
export async function signInWithCredentials(credentials: any) {
  "use server";
  const scopes = await fetch(OPENID_URL)
    .then((response) => response.json())
    .then((json) =>
      json?.scopes_supported
        .filter((i: string) => i !== "FundraiserService")
        ?.join(" ")
    );
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  const urlencoded = new URLSearchParams();
  const urlEncodedContent: Record<string, string> = {
    grant_type: "password",
    client_id: "Angular",
    username: credentials.username as string,
    password: credentials.password as string,
    scope: scopes,
  };
  Object.keys(urlEncodedContent).forEach((key) =>
    urlencoded.append(key, urlEncodedContent[key])
  );
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };
  const response = await fetch(TOKEN_URL, requestOptions);
  return await response.json();
}
export async function obtainAccessTokenByRefreshToken(refreshToken: string) {
  "use server";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  const urlencoded = new URLSearchParams();
  const urlEncodedContent: Record<string, string> = {
    client_id: "Angular",
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };
  Object.keys(urlEncodedContent).forEach((key) =>
    urlencoded.append(key, urlEncodedContent[key])
  );
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };
  const response = await fetch(TOKEN_URL, requestOptions);
  return await response.json();
}
