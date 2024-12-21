import { useState, useEffect } from "react";
import FetchingService from "../../src/libs/fetchingService";

interface FetchApi<T> {
    loading:    boolean;
    error:      string | null;
    data:       T | null;
}

export const useFetchAPI = <T>(url: string): FetchApi<T> => {

    const [status, setStatus] = useState<FetchApi<T>>({loading: true, error: null, data: null});
    
    useEffect(() => {

        const Fetcher = new FetchingService(url);
    
        Fetcher.fetchInfo()
        .then(() => {
            setStatus({loading: false, error: null, data: Fetcher.getAllData() as T});
        })
        .catch((err) => {
            setStatus({loading: false, error: err.message, data: null})
        });
    
    }, [url]);

    return status;
};