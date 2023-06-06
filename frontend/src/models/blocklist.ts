export interface Blocklist {
    _id: string,
    userId: string,
    name: string,
    listOfURL?: string[],
    createdAt?: string,
    updatedAt?: string,
    isActive: boolean,
}