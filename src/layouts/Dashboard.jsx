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
        <div className={`flex flex-col min-h-screen transition-all duration-300
            ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
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
            <div className={`flex items-center flex-1 p-2 transition-all duration-300
                ${isDark ? 'text-white bg-gray-800' : 'text-gray-900 bg-gray-200'}
                `}>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard