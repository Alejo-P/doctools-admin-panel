import React from 'react'
import { FaUserCheck, FaUserMinus } from 'react-icons/fa'
import { IoIosSend } from "react-icons/io";

const UserAccountActions = ({
    user,
    onDisableProfile,
    onEnableProfile,
    onSendVerifyEmail,
    isDark
}) => {
    return (
        <div className={`flex flex-col md:grid md:grid-cols-2 gap-2 p-4 rounded-lg shadow-md
            ${isDark ? 'bg-gray-900' : 'bg-white'} border-2 ${isDark ? 'border-gray-700' : 'border-gray-300'}
            `}>
            {
                user.is_active ? (
                    <button
                        className={`flex items-center justify-evenly px-4 py-2 rounded-lg font-bold transition-all duration-300
                            ${isDark ? 'bg-red-500 hover:bg-red-600' : 'bg-red-400 hover:bg-red-500'}
                        `}
                        onClick={onDisableProfile}
                    >
                        <FaUserMinus className='text-2xl'/>
                        Desactivar cuenta
                    </button>
                ) : (
                    <button
                        className={`flex items-center justify-evenly px-4 py-2 rounded-lg font-bold transition-all duration-300
                            ${isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-400 hover:bg-green-500'}
                        `}
                        onClick={onEnableProfile}
                    >
                        <FaUserCheck className='text-2xl'/>
                        Activar cuenta
                    </button>
                )
            }
            {
                !user.is_verified && (
                    <button
                        className={`flex items-center justify-evenly px-4 py-2 rounded-lg font-bold transition-all duration-300
                            ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'}
                        `}
                        onClick={onSendVerifyEmail}
                    >
                        <IoIosSend className='text-2xl'/>
                        Enviar correo de verificación
                    </button>
                )
            }
        </div>
    )
}

export default UserAccountActions
