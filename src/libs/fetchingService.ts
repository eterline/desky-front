import { getAuthToken } from "./localStorageService";

const httpErrorString = "HTTP error! Status: ";

export default class FetchingService {

    protected apiUrl:         string;
    protected fetchedData:    any;
    protected isDebug:        boolean;
    protected apiToken:       string;

    constructor (api: string, debug: boolean = false) {
        this.apiUrl = api;
        this.isDebug = debug;
        this.apiToken = getAuthToken()
        this.fetchedData = null;
    }

    async fetchInfo(): Promise<any> {
        try {
            this.isDebug && console.log("fetched URL: " + this.apiUrl)
            const response = await fetch(this.apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (!response.ok) {throw new Error( httpErrorString + response.status );}

            this.fetchedData = await response.json();
        } catch (error) {
            throw error;
        }
    };

    async postInfo(body: any, headers: HeadersInit): Promise<any> {
        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },
                body: JSON.stringify(body)
            })

            if (!response.ok) {throw new Error( httpErrorString + response.status );}

            this.fetchedData = await response.json();
        } catch (error) {
            throw error;
        }
    };

    debugInfo(): void {
        this.isDebug && console.debug(`Fetched data =>: ${this.fetchedData}`);
    }

    getAllData<T>(): T {
        return this.fetchedData
    }
}