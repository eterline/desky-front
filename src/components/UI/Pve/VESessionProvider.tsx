import { useState, ReactNode, FC } from 'react';
import { SessionState, VESessionContext } from '../../../hooks';


const VESessionProvider: FC<{ children: ReactNode }> = ({ children }) => {
    
    const [session, setSessionState] = useState<SessionState | undefined>(undefined);

    const setVESession = (newSession: number, newNode: string) => {
        setSessionState({ session: newSession, node: newNode });
    };

    return (
        <VESessionContext.Provider value={{ session, setVESession }}>
            {children}
        </VESessionContext.Provider>
    );
};

export default VESessionProvider;