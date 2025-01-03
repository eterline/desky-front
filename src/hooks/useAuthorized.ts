import {useState, useEffect} from 'react';
import FetchingService from '../libs/fetchingService';
import { getItemLocalStorage } from '../libs/localStorage';
import { resolveApi, API } from '../libs/apiResolve';
import showToast from '../libs/showToats';

const useAuthorized = (defaults: boolean): boolean => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
        const token = getItemLocalStorage('token');
        return token !== "" && defaults;
    });

    useEffect(() => {
        const token = getItemLocalStorage('token');
        if (token === "") {
            setIsAuthorized(false);
            return;
        }

        if (isAuthorized) {
            return;
        }

        const Fetcher = new FetchingService(resolveApi(API.check), false);

        Fetcher.fetchInfo()
            .then(() => {
                setIsAuthorized(Fetcher.getStatusCode() === 200);
            })
            .catch(() => {
                setIsAuthorized(false);
            });

    }, [isAuthorized, defaults]);

    return isAuthorized;
};

export default useAuthorized;