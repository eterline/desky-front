import { useState} from 'react';

interface ElementSwitch {
    status: boolean
    switchStatusFunc: () => void
}

// switch boolean state for element
const useElementSwitch = (defaults: boolean): ElementSwitch  => {
    const [status, setStatus] = useState<boolean>(defaults);
    
    const switchStatusFunc = (): void => {
        setStatus(!status)
    }

    return {status, switchStatusFunc};
};

export default useElementSwitch;