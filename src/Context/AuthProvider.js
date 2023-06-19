import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase/config";
import { Spin } from "antd";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const history = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName, email, uid, photoURL
                });
                setIsLoading(false);
                history('/');
                return;
            }
            setIsLoading(false);
            history('/login');
        });

        // Clean function
        return () => {
            unsubscribed();
        }
    }, [history])

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    )
}
