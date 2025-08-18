// @ts-check
import React, { useState } from 'react'
import UserAvatar from './UserAvatar'
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useAuthContext } from '@contexts/AuthProvider'
import clsx from 'clsx';


const UserCard = ({
    isDark,
    user,
    isMobile = false,
    isSelected = false,
    onClick
}) => {
    const { user: authUser } = useAuthContext();
    const isOwner = authUser?.id === user?.id;

    const baseClass = "flex flex-row border-b-2 gap-4 border-dashed p-1 cursor-pointer transition-all duration-300"

    const selectedClasses = clsx(
        {
            "bg-gray-700 border-blue-400 rounded-t-md": isDark && isSelected,
            "bg-gray-300 border-blue-400 rounded-t-md": !isDark && isSelected,
            "text-white cursor-pointer": isDark && !isSelected,
            "text-gray-900 cursor-pointer": !isDark && !isSelected,
        }
    );

    const handleClick = () => {
        onClick(user);
    }

    return (
        <div className={clsx(baseClass, selectedClasses)}
            onClick={handleClick}
        >
            <div className='flex justify-center items-center'>
                <UserAvatar
                    user={user}
                    isDark={isDark}
                    size={40}
                />
            </div>
            <div className='flex flex-col flex-1 gap-3 justify-center items-start text-sm'>
                {[
                    {label:"Usuario", value:"name"},
                    {label:"Email", value:"email"},
                    {label:"Roles", value:"roles"}
                ].map((item, index) => (
                    <p key={index} className='truncate'>
                        <strong>{item.label}:</strong> {Array.isArray(user[item.value]) ? user[item.value].join(', ') : user[item.value]}
                    </p>
                ))}
                {
                    isMobile && (
                        <div className='flex flex-row w-full gap-2 items-center justify-center'>
                            <p className={`text-sm font-semibold text-center flex flex-row items-center`}>
                                <span
                                    className={`inline-block w-2 h-2 rounded-full mr-3 ${user.is_active ? 'bg-green-600' : 'bg-red-600'}`}
                                    data-tooltip-id="statusLabel"
                                    data-tooltip-content={user.is_active ? 'Usuario activo' : 'Usuario inactivo'}
                                ></span>
                                {user.is_active ? 'Activo' : 'Inactivo'}
                            </p>

                            <p className={`text-sm font-semibold text-center flex flex-row items-center`}>
                                <span
                                    className={`inline-block w-2 h-2 rounded-full mr-3 ${user.is_verified ? 'bg-green-600' : 'bg-red-600'}`}
                                    data-tooltip-id="verifiedLabel"
                                    data-tooltip-content={user.is_verified ? 'Usuario verificado' : 'Usuario no verificado'}
                                ></span>
                                {user.is_verified ? 'Verificado' : 'No verificado'}
                            </p>
                            <div className="flex flex-col gap-3 items-start justify-center">
                            </div>
                            <ReactTooltip
                                id="statusLabel"
                                place="top"
                                className={`tooltip ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                            />
                            <ReactTooltip
                                id="verifiedLabel"
                                place="top"
                                className={`tooltip ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                            />
                        </div>
                    )
                }
            </div>
            {/* Acciones  */}
            {
                !isMobile && (
                    <div className='flex flex-col justify-center items-start gap-2'>
                        <p className={`text-sm font-semibold text-center flex flex-row items-center`}>
                            <span
                                className={`inline-block w-2 h-2 rounded-full mr-3 ${user.is_active ? 'bg-green-600' : 'bg-red-600'}`}
                                data-tooltip-id="statusLabel"
                                data-tooltip-content={user.is_active ? 'Usuario activo' : 'Usuario inactivo'}
                            ></span>
                            {user.is_active ? 'Activo' : 'Inactivo'}
                        </p>

                        <p className={`text-sm font-semibold text-center flex flex-row items-center`}>
                            <span
                                className={`inline-block w-2 h-2 rounded-full mr-3 ${user.is_verified ? 'bg-green-600' : 'bg-red-600'}`}
                                data-tooltip-id="verifiedLabel"
                                data-tooltip-content={user.is_verified ? 'Usuario verificado' : 'Usuario no verificado'}
                            ></span>
                            {user.is_verified ? 'Verificado' : 'No verificado'}
                        </p>
                        <div className="flex flex-col gap-3 items-start justify-center">
                        </div>
                        <ReactTooltip
                            id="statusLabel"
                            place="top"
                            className={`tooltip ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                        />
                        <ReactTooltip
                            id="verifiedLabel"
                            place="top"
                            className={`tooltip ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                        />
                        {
                            (!isOwner && isMobile) && (
                                <>
                                    <button
                                        className={`flex p-2 rounded-lg transition-all duration-300
                                            ${isDark ? 'bg-green-700 text-white' : 'bg-green-300 text-gray-900 hover:bg-green-400'} 
                                            hover:scale-95 shadow-lg hover:shadow-xl cursor-pointer
                                        `}
                                        data-tooltip-id='edit-user-tooltip'
                                        data-tooltip-content={`Editar usuario ${user.name}`}
                                    >
                                        <FaPen className='text-lg' />
                                    </button>
                                    <button
                                        className={`flex gap-2 p-2 rounded-lg transition-all duration-300
                                            ${isDark ? 'bg-red-700 text-white' : 'bg-red-300 text-gray-900 hover:bg-red-400'} 
                                            hover:scale-95 shadow-lg hover:shadow-xl cursor-pointer
                                        `}
                                        data-tooltip-id='delete-user-tooltip'
                                        data-tooltip-content={`Eliminar usuario ${user.name}`}
                                    >
                                        <MdDeleteForever className='text-lg' />
                                    </button>
                                    <ReactTooltip id='delete-user-tooltip' place='left' />
                                    <ReactTooltip id='edit-user-tooltip' place='left' />
                                </>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default UserCard
