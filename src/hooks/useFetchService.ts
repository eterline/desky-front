import { use, useEffect, useState } from "react";
import { APIResponse } from "../lib/api/appsService";
  
export interface ApiStatus<T> {
    loading: boolean;
    error: string | null;
    data: T | null;
}

const useFetchService = <T>(fetchFunc: () => Promise<APIResponse<T>>): ApiStatus<T>  => {

    const [status, setStatus] = useState<ApiStatus<T>>({
        loading:    true,
        error:      null,
        data:       null,
    });
    
    useEffect(() => {

        fetchFunc()
        .then((data) => {
            setStatus({
                loading:    false,
                error:      null, 
                data:       data.Data,
            });
        })
        .catch((err) => {
            setStatus({
                loading:    false,
                error:      err, 
                data:       null,
            })
        });
    
    }, []);

    return status;
};

export default useFetchService;