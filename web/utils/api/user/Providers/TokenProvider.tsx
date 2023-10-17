// --- Librairies --- //
import React, { createContext, useContext, useEffect, useState, } from 'react';

// --- Interfaces --- //
import { VerifyUserToken } from '../verify';

const TokenContext = createContext<{
    token: string;
    setToken: (token: string) => void;
}>({
    token: '',
    setToken: () => {}
});

export const TokenProviders = ({ children }: any) => {
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        const checkToken = async (userToken: string) => {
            const res = await VerifyUserToken(userToken);

            res === null ? setToken('') : setToken(res);

            if (res === null)
                localStorage.removeItem("token");
        };

        const userToken: string = localStorage.getItem("token") as string;

        if (userToken === null)
            return;
        checkToken(userToken);
    }, []);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    return useContext(TokenContext);
};
