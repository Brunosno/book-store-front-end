'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthResponseDTO } from '@/types/AuthType';

interface AuthContextType {
    user: AuthResponseDTO | null;
    login: (userData: AuthResponseDTO) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "userData";

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<AuthResponseDTO | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    function login(userData: AuthResponseDTO) {
        setUser(userData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    }

    function logout() {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}