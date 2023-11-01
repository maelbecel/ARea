// --- Librairies --- //
import React, { createContext, useContext, useEffect, useState, } from 'react';

// --- Interfaces --- //
import { UserProfile } from '../interface/interface';
import { GetProfile } from '../me';

const UserContext = createContext<{
    user: UserProfile;
    setUser: (user: UserProfile) => void;
}>({
    user: { id: 0, username: '', email: '', passwordLength: 0, connectedServices: [] },
    setUser: () => {}
});

export const UserProviders = ({ children }: any) => {
    const [user, setUser] = useState<UserProfile>({ id: 0, username: '', email: '', passwordLength: 0, connectedServices: [] });

    useEffect(() => {
        const token: string = localStorage.getItem("token") as string;

        const getProfile = async (token: string) => {
            setUser(await GetProfile(token) as UserProfile);
        }

        getProfile(token);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
