import { useContext, createContext, FC } from 'react';
import AppService from '../components/UI/App/AppService';
import SystemService from '../components/UI/System/SystemService';
import RemoteService from '../components/UI/Remote/RemoteService';

export type ServiceMapPattern  = Map<string, FC>

export const ServiceMap: ServiceMapPattern = new Map([
    ['services',    AppService],
    ['system',      SystemService],
    ['remote',      RemoteService],
]);

export const SelectService = (service: string): FC => {
    return ServiceMap.get(service)
}

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