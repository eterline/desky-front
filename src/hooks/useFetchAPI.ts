import { useState, useEffect } from "react";
import FetchingService from "../../src/libs/fetchingService";
import { debug } from "console";

interface FetchApi<DataType> {
    loading:    boolean;
    error:      string | null;
    data:       DataType | null;
}

const useFetchAPI = <DataType>(url: string): FetchApi<DataType> => {

    const [status, setStatus] = useState<FetchApi<DataType>>({loading: true, error: null, data: null});
    
    useEffect(() => {

        const Fetcher = new FetchingService(url, true);
    
        Fetcher.fetchInfo()
        .then(() => {
            setStatus({loading: false, error: null, data: Fetcher.getAllData<DataType>()});
        })
        .catch((err) => {
            setStatus({loading: false, error: err.message, data: null})
        });
    
    }, [url]);

    return status;
};

export default useFetchAPI;