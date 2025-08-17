import React from 'react'
import { ToastContainer } from 'react-toastify';

import { useAppContext } from '@contexts/AppProvider';
import { useAuthContext } from '@contexts/AuthProvider';
import LoginForm from '@components/LoginForm';

const LoginPage = () => {
    const { isDark } = useAppContext();
    const { login } = useAuthContext();

    const handleSubmit = async (formData) => {
        if (Object.values(formData).some(value => value === '')) {
            handleNotificacion('error', 'Por favor, completa todos los campos', 4000);
            return;
        }

        await login(formData);
    };

    return (
        <>
            <div className={`flex min-h-screen items-center justify-center
                ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'}
                `}>
                <LoginForm isDark={isDark} handleLogin={handleSubmit} />
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
