import { getAuthToken } from "./localStorageService";
import { getItemLocalStorage } from '../libs/localStorage';
import showToast from '../libs/showToats';

const httpErrorString = "HTTP error! Status: ";

export default class FetchingService {
    protected apiUrl: string;
    protected fetchedData: any;
    protected isDebug: boolean;
    protected apiToken: string;
    protected status: number = 0;

    constructor(api: string, debug: boolean = false) {
        this.apiUrl = api;
        this.isDebug = debug;
        this.apiToken = getAuthToken();
        this.fetchedData = null;
    }

    private logDebug(message: string): void {
        if (this.isDebug) {
            console.debug(message);
        }
    }

    private getHeaders(extraHeaders?: HeadersInit): HeadersInit {
        return {
            "Content-Type": "application/json",
            "DeskyJWT": getItemLocalStorage("token"),
            ...extraHeaders,
        };
    }

    async fetchInfo(): Promise<any> {
        try {
            this.logDebug(`Fetching URL: ${this.apiUrl}`);
            const response = await fetch(this.apiUrl, {
                method: "GET",
                headers: this.getHeaders(),
            });

            if (!response.ok) {
                showToast(`HTTP Error: ${response.status}`)
                this.fetchedData = await response.json();
                throw new Error(`HTTP Error: ${response.status}`);
            }

            this.status = response.status;
            this.fetchedData = await response.json();
        } catch (error) {
            showToast(`Error during GET at ${this.apiUrl}: ${error.message}`)
            throw new Error(`Error during GET at ${this.apiUrl}: ${error.message}`);
        }
    }

    async postInfo(body: any, headers: HeadersInit = {}): Promise<any> {
        try {
            this.logDebug(`Posting to URL: ${this.apiUrl}`);
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: this.getHeaders(headers),
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            this.status = response.status;
            this.fetchedData = await response.json();
        } catch (error) {
            throw new Error(`Error during POST at ${this.apiUrl}: ${error.message}`);
        }
    }

    debugInfo(): void {
        this.logDebug(`Fetched data =>: ${JSON.stringify(this.fetchedData)}`);
    }

    getStatusCode(): number {
        return this.status;
    }

    getAllData<T>(): T {
        if (this.fetchedData === null) {
            throw new Error("No data fetched yet");
        }
        return this.fetchedData as T;
    }
}