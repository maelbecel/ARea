// --- Librairies --- //
import React, { createContext, useContext, useState, useEffect } from 'react';

// Créez un contexte pour l'authentification
const AuthContext = createContext({
    token: '',
    setToken: (value: string) => {}
});

// Créez un composant AuthProvider qui enveloppe votre application
export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string>('');

    // Fonction pour vérifier si un token existe dans le local storage
    const checkToken = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            setToken(token);

            // TODO: vérifier si le token est toujours valide
        } else
            setToken('');
    }

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Créez un hook personnalisé pour accéder au contexte
export const useAuth = () => {
    return useContext(AuthContext);
};
