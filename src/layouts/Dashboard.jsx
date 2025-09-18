import React, { act } from 'react'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'

import { useAppContext } from '@contexts/AppProvider'
import { useAuthContext } from '@contexts/AuthProvider'
import SideBar from '@components/SideBar'
import ActionsCard from '@components/ActionsCard'

const Dashboard = () => {
    const { isDark, handleThemeToggle, isMobile, actionItems, showActions } = useAppContext();
    const { user, logout } = useAuthContext();

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className={`flex flex-col h-screen transition-all duration-300 overflow-hidden scrollbar-track-transparent
            ${isDark ? 'bg-gray-900 text-white scrollbar-thumb-gray-300' : 'bg-white text-gray-900 scrollbar-thumb-gray-700'}
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
                autoClose={4000}
                closeOnClick
                pauseOnHover
                draggable
            />
            <div className={`flex flex-1 transition-all duration-300 overflow-y-auto scrollbar
                ${isDark ? 'text-white bg-gray-800' : 'text-gray-900 bg-gray-200'}
                scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}
            >
                <Outlet />
                <ActionsCard
                    isDark={isDark}
                    actionItems={actionItems}
                    showActions={showActions}
                />
            </div>
        </div>
    )
}

export default Dashboard