// @ts-check
import React from 'react'
import UserAvatar from './UserAvatar'
import { MdOutlineWbSunny } from 'react-icons/md'
import { FaMoon, FaPen } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { motion, AnimatePresence } from "framer-motion";

const ProfileCard = ({
    user,
    isDark,
    logout,
    handleEditProfile,
    handleChangeTheme,
    showCard,
    handleFocusOut,
    isMobile = false
}) => {
    return (
        <AnimatePresence>
            {
                showCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50"
                    >
                        <div 
                            className="absolute inset-0 bg-black/20  animate-fadeIn"
                            onClick={handleFocusOut}
                        />

                        <motion.div
                            className={`absolute top-16 flex items-center gap-2 border
                                ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
                                p-4 rounded-lg shadow-lg
                            `}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <div className='flex justify-center items-center'>
                                <UserAvatar
                                    user={user}
                                    isDark={isDark}
                                    size={36}
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
                                {!isMobile ? (
                                    <>
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
                                            {isDark ? <FaMoon className="text-2xl" /> : <MdOutlineWbSunny className="text-2xl" />}
                                        </button>
                                        <ReactTooltip id="temaLabel" place="top" delayShow={100}/>
                                    </>
                                ): (
                                    <>
                                        <button
                                            className={`flex gap-2 p-2 rounded-lg transition-all duration-300
                                                ${isDark ? 'bg-green-700 text-white' : 'bg-green-300 text-gray-900 hover:bg-green-400'} 
                                                hover:scale-95 shadow-lg hover:shadow-xl cursor-pointer
                                            `}
                                            title='Editar perfil'
                                            data-tooltip-id="editLabel"
                                            data-tooltip-content="Editar perfil"
                                            onClick={handleEditProfile}
                                        >
                                            <FaPen className='text-xl' />
                                        </button>
                                        <ReactTooltip id="editLabel" place="top" delayShow={100}/>
                                    </>
                                )}
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
                                    <IoLogOut className='text-xl' />
                                </button>
                                <ReactTooltip id="logoutLabel" place="top" delayShow={100}/>
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default ProfileCard
