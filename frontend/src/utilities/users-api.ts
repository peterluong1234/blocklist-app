import { User } from "../models/user";
import sendRequest from "./send-request"
const BASE_URL = 'api/users';



export interface UserInput {
    username: string,
    email: string,
    password: string,
}

export async function signUp(user: UserInput): Promise<string> {
    return sendRequest(BASE_URL, "POST", user)
    // const response = await fetchData(BASE_URL, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(user),
    // });
    // return response.json();
}

export interface LoginInput {
    username: string,
    password: string,
}
export async function login(credentials: LoginInput): Promise<string>{
    return sendRequest(BASE_URL + '/login', "POST", credentials)
    // const response = await fetchData(BASE_URL + '/login', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(credentials),
    // });
    // return response.json();
}

export function checkToken() {
    return sendRequest(BASE_URL + '/check-token');
}