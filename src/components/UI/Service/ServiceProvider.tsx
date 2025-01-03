import React, { useState, ReactNode } from 'react';
import { ServiceContext } from '../../../hooks';

const ServiceProvider: React.FC<{ children: ReactNode }>  = ({ children }) => {

    const [selectedService, setSelectedService] = useState<string>('');

    return (
        <ServiceContext.Provider value={{selectedService, setSelectedService}}>
            {children}
        </ServiceContext.Provider>
    );
};

export default ServiceProvider;