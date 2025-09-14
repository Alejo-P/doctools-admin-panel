import React, { useState, useContext, createContext, useMemo } from 'react'
import { toast } from 'react-toastify';
import { useWindowSize } from '@hooks/useWindowSize';

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(localStorage.getItem('isDark') === 'true');
    const [actionItems, setActionItems] = useState([]);
    const [showActions, setShowActions] = useState(false);
    const windowSize = useWindowSize();
    const isMobile = windowSize.width <= 768;

    const handleThemeToggle = () => {
        if (isDark) {
            document.documentElement.classList.remove('bg-gray-900');
            document.documentElement.classList.add('bg-white');
        } else {
            document.documentElement.classList.remove('bg-white');
            document.documentElement.classList.add('bg-gray-900');
        }
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
        actionItems,
        showActions,
        setActionItems,
        setShowActions,
        handleThemeToggle,
        handleNotificacion,
        formatDate
    }), [isDark, isMobile, actionItems, showActions]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
