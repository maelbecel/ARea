// --- Librairies --- //
import React, { createContext, useContext, useEffect, useState, } from 'react';

// --- Interfaces --- //
import { Service } from '../interface/interface';
import { GetServices } from '../service';

const ServiceContext = createContext<{
    services: Service[];
    setServices: (services: Service[]) => void;
}>({
    services: [],
    setServices: () => {}
});

export const ServiceProviders = ({ children }: any) => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const token: string = localStorage.getItem("token") as string;

        const getServices = async (token: string) => {
            setServices(await GetServices(token));
        }

        getServices(token);
    }, []);

    return (
        <ServiceContext.Provider value={{ services, setServices }}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useServices = () => {
    return useContext(ServiceContext);
};
