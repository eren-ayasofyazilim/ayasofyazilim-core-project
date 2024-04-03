import { getAccountServiceClient } from "src/lib";

export async function GET(request: Request) {
    
    const client = getAccountServiceClient();

    console.log("Cookie", request.headers.get("Cookie") || '')
    const user = await client.profile.getApiAccountMyProfile();
    return new Response(JSON.stringify(user));
 
}