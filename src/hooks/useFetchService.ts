import { useEffect, useState, useCallback } from "react";
import { APIResponse } from "../lib/api/appsService";
import { getItemLocalStorage, setItemLocalStorage } from "../lib/localStorage/localStorageService";

export interface ApiStatus<T> {
    loading: boolean;
    error: string | null;
    data: T | null;
}

const useFetchService = <T>(fetchFunc: () => Promise<APIResponse<T>>, saveKey?: string): ApiStatus<T>  => {
    const defaultData = (): ApiStatus<any> => {
        if (saveKey) {
            const savedData = getItemLocalStorage(saveKey);
            if (savedData) return { loading: false, error: null, data: savedData };
        }
        return { loading: true, error: null, data: null };
    };

    const [status, setStatus] = useState<ApiStatus<T>>(defaultData);

    const fetchData = useCallback(async () => {
        setStatus((prev) => ({ ...prev, loading: true }));
        
        try {
            const data = await fetchFunc();
            setStatus({ loading: false, error: null, data: data.Data });

            if (saveKey) {
                setItemLocalStorage(saveKey, data.Data);
            }
        } catch (err) {
            setStatus({ loading: false, error: String(err), data: null });
        }
    }, [fetchFunc, saveKey]);

    useEffect(() => {
        const controller = new AbortController();
        
        fetchData();

        return () => controller.abort();
    }, [fetchData]);

    return status;
};

export default useFetchService;
