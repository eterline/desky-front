import {useState, useEffect} from 'react';
import FetchingService from '../libs/fetchingService';

const useAuthorized = (url: string, defaults: boolean): boolean => {

    const [isAuthorized, setIsAuthorized] = useState<boolean>(defaults);
    
    useEffect(() => {

        const Fetcher = new FetchingService(url, true);
    
        Fetcher
            .fetchInfo()
            .then(() => {setIsAuthorized(Fetcher.getStatusCode() == 200)})
            .catch( () => {setIsAuthorized(false)});

    }, [url, defaults]);

    return isAuthorized;
};

export default useAuthorized;