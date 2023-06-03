import { UserInput } from "./users-api";
import * as usersAPI from "./users-api";

export function getToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        return null;
    }
    return token;

}

export function getUser() {
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }

export async function signUpUser(userData: UserInput) {
    try {
        const token = await usersAPI.signUp(userData);
        localStorage.setItem('token', token);
        getUser();
    } catch (error) {
        console.error(error);
    }

}

interface LoginValues {
    username: string,
    password: string,
}

export async function login(credentials : LoginValues) {
    try {
        const token = await usersAPI.login(credentials);
        localStorage.setItem('token', token);
        return getUser();
    } catch (error) {
        console.error(error);
    }
}

export async function logout() {
    localStorage.removeItem('token');
}