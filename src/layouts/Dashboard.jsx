import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'

import { useAppContext } from '@contexts/AppProvider'
import { useAuthContext } from '@contexts/AuthProvider'
import SideBar from '@components/SideBar'

const Dashboard = () => {
    const { isDark, handleThemeToggle, isMobile } = useAppContext();
    const { user, logout } = useAuthContext();

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className={`flex flex-col h-screen transition-all duration-300 overflow-hidden
            ${isDark ? 'bg-gray-900 text-white scrollbar-thumb-gray-300' : 'bg-white text-gray-900 scrollbar-thumb-gray-700'}
            scrollbar-track-transparent
        `}>
            <SideBar 
                isDark={isDark}
                user={user}
                changeTheme={handleThemeToggle}
                logout={handleLogout}
                isMobile={isMobile}
            />
            <ToastContainer
                newestOnTop
                limit={3}
                position="bottom-right"
                autoClose={4000}
                closeOnClick
                pauseOnHover
                draggable
                progress={undefined}
                theme={isDark ? "dark" : "light"}
            />
            <div className={`flex flex-1 p-2 transition-all duration-300 overflow-y-auto
                ${isDark ? 'text-white bg-gray-800' : 'text-gray-900 bg-gray-200'}
                scrollbar-thumb-rounded-full
                scrollbar-track-rounded-full scrollbar
                `}>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard