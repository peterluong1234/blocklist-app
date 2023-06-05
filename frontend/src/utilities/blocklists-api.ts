import { Blocklist } from "../models/blocklist";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchBlocklist(userId: string): Promise<Blocklist[]> {
    const response = await fetchData("/api/blocklists/" + userId, { method: "GET" })
    return response.json();
}

export async function fetchList(id: string): Promise<Blocklist>{
    const response = await fetchData(`/api/blocklists/${id}`, { method: "GET" })
    return response.json();
}

export interface BlocklistInput {
    userId: string,
    name: string,
    listOfURL?: string[],
}

export async function createBlocklist(blocklist: BlocklistInput): Promise<Blocklist> {
    const response = await fetchData("/api/blocklists",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blocklist),
    });
    return response.json();
}

export async function updateBlocklist(blocklist: BlocklistInput, id: string): Promise<Blocklist> {
    const response = await fetchData(`/api/blocklists/${id}`,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blocklist),
    });
    return response.json()
}

export async function deleteBlocklist(id: string) {
    await fetchData("api/blocklists/" + id, { method: "DELETE" });
}