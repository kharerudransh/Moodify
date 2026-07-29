import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function autologin() {
            setLoading(true);
            try {
                const data = await getMe();
                setUser(data.user);
            } catch (error) {
                // expected when not logged in — ignore
            } finally {
                setLoading(false);
            }
        }
        autologin();
    }, []); // AuthProvider sirf ek baar mount hota hai (app ke root mein), isliye ye sirf ek baar chalega

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}