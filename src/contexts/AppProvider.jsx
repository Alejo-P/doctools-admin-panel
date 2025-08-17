import React, { useState, useContext, createContext, useMemo } from 'react'
import { toast } from 'react-toastify';

import { useWindowSize } from '@hooks/useWindowSize';

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(localStorage.getItem('isDark') || "tru"=== 'true');
    const [menuOptionSelected, setMenuOptionSelected] = useState("Dashboard");
    const windowSize = useWindowSize();
    const isMobile = windowSize.width < 425;


    const handleThemeToggle = () => {
        localStorage.setItem('isDark', !isDark);
        setIsDark(prev => !prev);
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

    const handleChangeMenuOption = (option) => {
        setMenuOptionSelected(option);
    }

    const value = useMemo(() => ({
        isDark,
        isMobile,
        menuOptionSelected,
        handleChangeMenuOption,
        handleThemeToggle,
        handleNotificacion
    }), [isDark, isMobile, menuOptionSelected]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
