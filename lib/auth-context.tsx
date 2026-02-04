'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthContextType extends AuthState {
    login: (user: User) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: false,
    });

    const login = useCallback((user: User) => {
        setState({
            user,
            isAuthenticated: true,
            isLoading: false,
        });
    }, []);

    const logout = useCallback(() => {
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    }, []);

    const setLoading = useCallback((loading: boolean) => {
        setState((prev) => ({ ...prev, isLoading: loading }));
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, login, logout, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
