import { createContext, useContext } from "react";

export interface SSHConn {
    id: number
    hostname: string
    allow: boolean
}


export interface SSHConnectionContextProps {
    selectedSSHConn: SSHConn;
    setSelectedSSHConn: (conn: SSHConn) => void;
}

export const SSHConnContext = createContext<SSHConnectionContextProps | undefined>(undefined);

export const useSSHConnContext = () => {
    const context = useContext(SSHConnContext);
    if (!context) {
        throw new Error('useSSHConnContext must be used within a SSHConnProvider');
    }
    return context;
};

export default useSSHConnContext;