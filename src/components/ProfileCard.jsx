// @ts-check
import React from 'react'
import UserAvatar from './UserAvatar'
import { MdOutlineWbSunny } from 'react-icons/md'
import { FaMoon } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { motion, AnimatePresence } from "framer-motion";

const ProfileCard = ({
    user,
    isDark,
    logout,
    onClick,
    handleChangeTheme
}) => {
    return (
        <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center'>
                <UserAvatar
                    user={user}
                    isDark={isDark}
                    size={36}
                    onClick={onClick}
                />
            </div>
            <div className='flex flex-col gap-1 justify-center items-start text-sm'>
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
            <div className='flex flex-col items-center gap-2'>
                <button
                    className={`p-2 rounded-lg transition-all duration-300
                        ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'} 
                        hover:scale-95 shadow-lg hover:shadow-xl
                    `}
                    title="Cambiar tema"
                    data-tooltip-id="temaLabel"
                    data-tooltip-content="Cambiar tema"
                    onClick={handleChangeTheme}
                >
                    {isDark ? <MdOutlineWbSunny className="text-2xl" /> : <FaMoon className="text-2xl" />}
                </button>
                <ReactTooltip id="temaLabel" place="top" delayShow={100}/>
                <button
                    onClick={logout}
                    className={`flex gap-2 p-2 rounded-lg transition-all duration-300
                        ${isDark ? 'bg-red-700 text-white' : 'bg-red-300 text-gray-900 hover:bg-red-400'} 
                        hover:scale-95 shadow-lg hover:shadow-xl cursor-pointer
                    `}
                    title="Cerrar sesión"
                    data-tooltip-id="logoutLabel"
                    data-tooltip-content="Cerrar sesión"
                >
                    <IoLogOut className='text-2xl' />
                </button>
                <ReactTooltip id="logoutLabel" place="top" delayShow={100}/>
            </div>
        </div>
    )
}

export default ProfileCard
