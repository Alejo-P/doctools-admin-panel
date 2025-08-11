import React, { useState, useContext, createContext, useMemo } from 'react'
import { toast } from 'react-toastify';

import { useWindowSize } from '@hooks/useWindowSize';

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(localStorage.getItem('isDark') || "true"=== 'true');
    const windowSize = useWindowSize();


    const handleThemeToggle = () => {
        localStorage.setItem('isDark', !isDark);
        setIsDark(prev => !prev);
    }

    const handleNotificacion = (type, message, duration) => {
        toast[type](message, {
            position: windowSize.width < 768 ? "top-center" : "bottom-right",
            autoClose: duration,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: isDark ? "dark" : "light"
        });
    };

    const value = useMemo(() => ({
        isDark,
        handleThemeToggle,
        handleNotificacion
    }), [isDark])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
