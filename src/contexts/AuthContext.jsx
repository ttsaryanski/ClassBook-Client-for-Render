import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { authService } from "../services/authService";
import { useError } from "./ErrorContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const { setError } = useError();

    const [user, setUser] = useState(null);
    const [isDirector, setIsDirector] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async (signal) => {
        setError(null);
        try {
            const userData = await authService.profile(signal);
            setUser(userData);

            if (userData && userData.role === "director") {
                setIsDirector(true);
            }
        } catch (err) {
            setUser(null);
            setIsDirector(false);
            if (err.message === "Invalid token!") {
                setError(null);
            } else {
                setError(err.message);
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetchUser(signal);

        return () => {
            abortController.abort();
        };
    }, []);

    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
    };

    const login = async (email, password) => {
        try {
            setError(null);
            await authService.login({ email, password });
            setIsLoading(true);
            await fetchUser();
            navigate("/");
        } catch (err) {
            setUser(null);
            setIsDirector(false);
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setError(null);
            await authService.logout();
            setUser(null);
            setIsDirector(false);
            navigate("/");
        } catch (err) {
            setUser(null);
            setIsDirector(false);
            setError(err.message);
            throw err;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isDirector,
                isLoading,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
