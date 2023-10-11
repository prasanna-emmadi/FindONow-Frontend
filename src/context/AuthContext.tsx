import React, { createContext, useContext } from "react";
import { useAppSelector } from "../redux/store/hooks";

interface AuthContextType {
    token?: string;
    isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    token: undefined,
    isAdmin: false,
});

interface Props {
    children: React.ReactNode;
}

const AuthContextProvider = (props: Props) => {
    const auth = useAppSelector((state) => state.auth);
    const value: AuthContextType = {
        token: auth.token.access_token,
        isAdmin: auth.user?.role === "admin",
    };
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Auth context not created");
    }
    return context;
};

export default AuthContextProvider;
