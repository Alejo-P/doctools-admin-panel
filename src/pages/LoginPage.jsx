import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';

import { useAppContext } from '@contexts/AppProvider';
import LoginForm from '@components/LoginForm';

const LoginPage = () => {
    const { isDark } = useAppContext();

    return (
        <>
            <div className={`flex min-h-screen items-center justify-center
                ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'}
                `}>
                <LoginForm isDark={isDark} />
            </div>
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
        </>
    )
}

export default LoginPage
