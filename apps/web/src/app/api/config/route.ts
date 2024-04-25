import { getAccountServiceClient } from "src/lib";

export async function GET(request: Request) {
  // console.log("Request ", request)
  // let auth = request.headers.get("Authorization") || "";
  // const client = getAccountServiceClient(auth);

  // const config =
  //   await client.abpApplicationConfiguration.getApiAbpApplicationConfiguration();
  let auth = request.headers.get("Authorization") || "";
  console.log("Auth from API ", auth)
  const myHeaders = new Headers();
  myHeaders.append("Accept-Language", "en,tr-TR;q=0.9,tr;q=0.8,en-US;q=0.7,ar;q=0.6,it;q=0.5");
  myHeaders.append("Authorization", auth);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  let result;
  const response = await fetch("http://192.168.1.38:44322/api/abp/application-configuration?IncludeLocalizationResources=false", requestOptions);
  result = await response.json();
  console.log("Api Config Current User", result.currentUser)
  console.log("Api Config Current User is Auth", result.currentUser.isAuthenticated)

  return new Response(JSON.stringify({ message: result.currentUser }));
}
