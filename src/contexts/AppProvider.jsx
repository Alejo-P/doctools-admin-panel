import React, { useState, useContext, createContext, useMemo } from 'react'
import { toast } from 'react-toastify';

import { useWindowSize } from '@hooks/useWindowSize';

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(localStorage.getItem('isDark') === 'true');
    const windowSize = useWindowSize();
    const isMobile = windowSize.width < 425;

    const handleThemeToggle = () => {
        localStorage.setItem('isDark', !isDark);
        setIsDark(prev => !prev);
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const handleNotificacion = (type, message, duration) => {
        toast[type](message, {
            position: isMobile ? "top-center" : "bottom-right",
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
        isMobile,
        handleThemeToggle,
        handleNotificacion,
        formatDate
    }), [isDark, isMobile]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
