import { useContext, createContext } from 'react';

export interface ServiceContextProps {
    selectedService: string;
    setSelectedService: (service: string) => void;
}

export const ServiceContext = createContext<ServiceContextProps | undefined>(undefined);

export const useServiceContext = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error('useServiceContext must be used within a ServiceProvider');
    }
    return context;
};

export default useServiceContext;