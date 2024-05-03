// AuthProvider component

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import SuperTokens from 'supertokens-react-native';

export interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean; // Add this line
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state

    useEffect(() => {
        // Initialize SuperTokens
        SuperTokens.init({
            apiDomain: "https://api.tickitapp.xyz",
            apiBasePath: "/auth",
        });

        const checkAuthentication = async () => {
            try {
                let doesSessionExist = await SuperTokens.doesSessionExist();
                setIsLoggedIn(doesSessionExist);
            } catch (error) {
                console.error("Error checking authentication", error);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false); // Set loading to false after check
            }
        };

        checkAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
