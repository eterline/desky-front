import { useState } from 'react';

export const usePveHost = (): PveHostProps => {
    const [select, setSelect] = useState<SessionProps>({session: 0, host: 'micro-ve'})

    const setSelected = (session: number, host: string) => {
        setSelect({session: session, host: host})
    }

    return {selected: select, setSelected}
};

interface SessionProps {
    session:    number | null
    host:       string
}

export interface PveHostProps {
    selected: SessionProps;
    setSelected: (session: number, host: string) => void;
}

export default usePveHost;