const httpErrorString = "HTTP error! Status: ";

export default class FetchingService {

    protected apiUrl:         string;
    protected fetchedData:    any;
    protected isDebug:        boolean;

    constructor (api: string, debug: boolean = false) {
        this.apiUrl = api;
        this.isDebug = debug;

        this.fetchedData = null;
    }

    async fetchInfo(): Promise<any> {
        try {
            const response = await fetch(this.apiUrl)

            if (!response.ok) {throw new Error( httpErrorString + response.status );}

            this.fetchedData = await response.json();
        } catch (error) {
            throw error;
        }
    };

    debugInfo(): void {
        this.isDebug && console.debug(`Fetched data =>: ${this.fetchedData}`);
    }

    getAllData(): Object {
        return this.fetchedData
    }
}