import { User } from "../models/user";

const BASE_URL = 'api/users';

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

export interface UserInput {
    username: string,
    email: string,
    password: string,
}

export async function signUp(user: UserInput) {
    const response = await fetchData(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    return response.json();
}

export interface LoginInput {
    username: string,
    password: string,
}
export async function login(credentials: LoginInput) {
    const response = await fetchData(BASE_URL + '/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}