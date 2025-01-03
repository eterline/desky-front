import { useState, ReactNode, FC } from 'react';
import { ServiceContext } from '../../../hooks';

const ServiceProvider: FC <{ children: ReactNode, defaults: string }>  = ({ children, defaults }) => {

    const [selectedService, setSelectedService] = useState<string>(defaults);

    return (
        <ServiceContext.Provider value={{selectedService, setSelectedService}}>
            {children}
        </ServiceContext.Provider>
    );
};

export default ServiceProvider;