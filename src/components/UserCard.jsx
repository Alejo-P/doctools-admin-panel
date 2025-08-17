// @ts-check
import React, { useState } from 'react'
import UserAvatar from './UserAvatar'
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import { useAuthContext } from '@contexts/AuthProvider';


const UserCard = ({
    isDark,
    user
}) => {
    const { user: authUser } = useAuthContext();
    const isOwner = authUser?.id === user?.id;

    return (
        <div className={`grid grid-cols-[20%_80%] md:w-95 rounded-lg border p-1 mb-2 shadow-lg shadow-gray-500
            ${isDark ? 'border-gray-300 bg-gray-800' : 'border-gray-400 bg-gray-100'}
            transition-all duration-300
        `}>
            <div className={`col-span-2 text-center font-bold text-lg mb-2 border-b
                ${isDark ? 'border-gray-300' : 'border-gray-400'}
                transition-colors duration-300
            `}>
                <p>Detalles del usuario</p>
            </div>
            <div className='flex justify-center items-center'>
                <UserAvatar
                    user={user}
                    isDark={isDark}
                    size={40}
                />
            </div>
            <div className='flex flex-col gap-3 justify-center items-start text-sm'>
                {[
                    {label:"Usuario", value:"name"},
                    {label:"Email", value:"email"},
                    {label:"Roles", value:"roles"}
                ].map((item, index) => (
                    <p key={index}>
                        <strong>{item.label}:</strong> {
                            Array.isArray(user[item.value]) ? user[item.value].join(', ') : user[item.value]
                        }
                    </p>
                ))}
            </div>
            {/* Acciones  */}
            <div className='col-span-2 flex justify-center items-center mt-2 gap-2'>
                {
                    isOwner ? (
                        <>
                            <button
                                className={`flex gap-2 p-2 rounded-lg transition-all duration-300
                                ${isDark ? 'bg-green-700 text-white' : 'bg-green-300 text-gray-900 hover:bg-green-400'} 
                                hover:scale-95 shadow-lg hover:shadow-xl cursor-pointer
                            `}>
                                <span>
                                    <FaPen className='text-lg' />
                                </span>
                                Editar perfil
                            </button>
                            <button
                                className={`flex gap-2 p-2 rounded-lg transition-all duration-300
                                ${isDark ? 'bg-red-700 text-white' : 'bg-red-300 text-gray-900 hover:bg-red-400'} 
                                hover:scale-95 shadow-lg hover:shadow-xl cursor-pointer
                            `}>
                                <span>
                                    <IoLogOut className='text-lg' />
                                </span>
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={`flex gap-2 p-2 rounded-lg transition-all duration-300
                                ${isDark ? 'bg-green-700 text-white' : 'bg-green-300 text-gray-900 hover:bg-green-400'} 
                                hover:scale-95 shadow-lg hover:shadow-xl cursor-pointer
                            `}>
                                <span>
                                    <FaPen className='text-lg' />
                                </span>
                                Editar perfil
                            </button>
                            <button
                                className={`flex gap-2 p-2 rounded-lg transition-all duration-300
                                    ${isDark ? 'bg-red-700 text-white' : 'bg-red-300 text-gray-900 hover:bg-red-400'} 
                                    hover:scale-95 shadow-lg hover:shadow-xl cursor-pointer
                                `}>
                                <span>
                                    <MdDeleteForever className='text-lg' />
                                </span>
                                Eliminar usuario
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default UserCard
