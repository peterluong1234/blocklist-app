import * as usersService from "./users-service";

export default async function sendRequest(url: string, method = "GET", payload: any = null) {
    const options: RequestInit = { method };

    try {
        if (payload) {
            options.headers = { "Content-Type": "application/json" };
            options.body = JSON.stringify(payload);
        }
        // console.log(payload);
        const token = usersService.getToken();
        // console.log(token);
        if(token) {
            options.headers = options.headers || {};
            options.headers = {
                "Authorization": `Bearer ${token}`
            };
        }

        const response = await fetchData(url, options)
        return response.json();
    } catch (error) {
        console.error();
    }

    // if(response.ok) return response.json();
    // throw new Error("Bad request");
}

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input,init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}