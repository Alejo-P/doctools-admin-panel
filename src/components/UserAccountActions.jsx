import React from 'react'
import { FaUserCheck, FaUserMinus } from 'react-icons/fa'
import { IoIosSend } from "react-icons/io";

const UserAccountActions = ({
    user,
    handleActionModal,
    onSendVerifyEmail,
    isDark
}) => {
    const actions = [];

    if (user.is_active) {
        actions.push(
            <button
                key="disable"
                className={`flex items-center justify-evenly px-4 py-2 truncate rounded-lg font-bold transition-all duration-300 max-w-sm ${isDark ? 'bg-red-500 hover:bg-red-600' : 'bg-red-400 hover:bg-red-500'}
                `}
                onClick={handleActionModal}
            >
                <FaUserMinus className="text-2xl mr-2" />
                Desactivar cuenta
            </button>
        );
    } else {
        actions.push(
            <button
                key="enable"
                className={`flex items-center justify-evenly px-4 py-2 truncate rounded-lg font-bold transition-all duration-300 max-w-sm ${isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-400 hover:bg-green-500'}
                `}
                onClick={handleActionModal}
            >
                <FaUserCheck className="text-2xl mr-2" />
                Activar cuenta
            </button>
        );
    }

    if (!user.is_verified) {
        actions.push(
            <button
                key="verify"
                className={`flex items-center justify-evenly px-4 truncate py-2 rounded-lg font-bold transition-all duration-300 max-w-sm ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'}
                `}
                onClick={onSendVerifyEmail}
            >
                <IoIosSend className="text-2xl mr-2" />
                Enviar correo de verificación
            </button>
        );
    }

    const containerClasses =
        actions.length === 1
            ? `flex justify-center p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out
                ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} border-2`
            : `grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out
                ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} border-2`;

    return (
        <div className={containerClasses}>
            {actions}
        </div>
    );
};

export default UserAccountActions;
