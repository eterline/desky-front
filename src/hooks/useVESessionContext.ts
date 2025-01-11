import { createContext, useContext } from 'react';

export interface SessionState {
    session: number;
    node: string;
}

export interface VESessionContextProps {
    session: SessionState | null;
    setVESession: (session: number, node: string) => void;
}

export const VESessionContext = createContext<VESessionContextProps | undefined>(undefined);

export const useVESessionContext = () => {
    const context = useContext(VESessionContext);
    if (!context) {
        throw new Error('useVESessionContext must be used within a VESessionProvider');
    }
    return context;
};