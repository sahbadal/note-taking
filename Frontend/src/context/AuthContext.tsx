import React, { createContext, useState, useContext } from 'react';

type User = {
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext < AuthContextType | null > (null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState < User | null > (null);

    const login = (user: User) => setUser(user);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export default AuthContext;