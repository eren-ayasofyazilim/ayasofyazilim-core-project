import { AppClient } from 'ayasofyazilim-saas'

export async function GET(request: Request) {
    const client = new AppClient({
        BASE: 'http://192.168.1.37:44399',
        HEADERS: {
            "X-Requested-With": "XMLHttpRequest",
            "Cookie": request.headers.get("Cookie") || ''
        },
    });
    console.log("Cookie", request.headers.get("Cookie") || '')
    const user = await client.profile.getApiAccountMyProfile();
    return new Response(JSON.stringify(user));
 
}