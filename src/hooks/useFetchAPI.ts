import { useState, useEffect } from "react";
import FetchingService from "../../src/libs/fetchingService";
import { debug } from "console";

interface FetchApi<DataType> {
    loading:    boolean;
    error:      string | null;
    data:       DataType | null;
}

interface ErrResponse {
    code: string
    message: string
}

const useFetchAPI = <DataType>(url: string, refetch?: number): FetchApi<DataType> => {

    const [status, setStatus] = useState<FetchApi<DataType>>({loading: true, error: null, data: null});
    
    useEffect(() => {

        const Fetcher = new FetchingService(url, false);
    
        Fetcher.fetchInfo()
        .then(() => {
            setStatus({loading: false, error: null, data: Fetcher.getAllData<DataType>()});
        })
        .catch((err) => {
            setStatus({loading: false, error: Fetcher.getAllData<ErrResponse>().message || err.message, data: null})
        });
    
    }, [url, refetch]);

    return status;
};

export default useFetchAPI;