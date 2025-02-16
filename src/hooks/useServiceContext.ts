import { useContext, createContext, FC } from 'react';
import AppService from '../components/UI/App/AppService';
import SystemService from '../components/UI/System/SystemService';
import RemoteService from '../components/UI/Remote/RemoteService';

export interface ServiceObj {
    component:  FC
    icon:       string
}

export const ServiceMap: Map<string, ServiceObj> = new Map([
    ['services',    { component: AppService, icon: "services" }],
    ['system',      { component: SystemService, icon: "adjustments" }],
    ['remote',      { component: RemoteService, icon: "terminal" }],
]);

export const SelectService = (service: string): ServiceObj => {
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