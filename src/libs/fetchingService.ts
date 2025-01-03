import { getAuthToken } from "./localStorageService";
import { getItemLocalStorage } from '../libs/localStorage';

const httpErrorString = "HTTP error! Status: ";

export default class FetchingService {

    protected apiUrl:         string;
    protected fetchedData:    any;
    protected isDebug:        boolean;
    protected apiToken:       string;
    protected status:         number;

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
                    "DeskyJWT": getItemLocalStorage("token"),
                }
            })

            if (!response.ok) {throw new Error( httpErrorString + response.status );}
            this.status = await response.status;
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
                    // "DeskyJWT": `${localStorage.getItem('token')}`,
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

    getStatusCode(): number {
        return this.status ?? null
    }

    getAllData<T>(): T {
        return this.fetchedData
    }
}