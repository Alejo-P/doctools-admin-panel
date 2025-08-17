// @ts-check
import React, { useState } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { IoLogOut } from 'react-icons/io5';

import SideBarItem from './SideBarItem';
import UserAvatar from './UserAvatar';
import Logo from '../assets/react.svg';
import UserCard from './UserCard';

const SideBar = ({
    isDark,
    user,
    changeTheme,
    logout,
    isMobile = false,
    optionSelected,
    onChangeOptionSelected
}) => {
    const [showProfileCard, setShowProfileCard] = useState(false);

    const menuItems = [
        { icon: MdSpaceDashboard, label: 'Dashboard' },
        { icon: FaUsers, label: 'Usuarios' },
        { icon: FaShieldAlt, label: 'Roles' },
        { icon: BiSolidUserAccount, label: 'Avatares' },
        { icon: GoGraph, label: 'Estadísticas' },
    ];

    const handleTheme = () => {
        changeTheme(!isDark);
    }

    const handleProfileCard = () => {
        setShowProfileCard(!showProfileCard);
    }

    const handleMenuOptionClick = (label) => {
        onChangeOptionSelected(label);
    }

    return (
        <div
            className={`
                flex flex-col justify-between overflow-hidden
                ${isDark ? 'text-white' : 'text-gray-900'}
                transition-all duration-300
            `}
        >
            {/* Seccion del titulo */}
            <div className="flex items-center justify-center gap-2 p-2">
                <img src={Logo} alt="React Logo" className="w-10 h-10" />
                <p
                    className={`text-lg uppercase font-bold overflow-hidden text-ellipsis
                        ${isDark ? 'text-white' : 'text-gray-900'}
                    `}>
                    DocTools Admin Panel
                </p>
                <div className='flex flex-1 justify-end items-center gap-2'>
                    {
                        isMobile ? (
                            <div className='flex items-center gap-2'>
                                <button
                                    className={`p-2 rounded-lg transition-all duration-300
                                        ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'} 
                                        hover:scale-95 shadow-lg hover:shadow-xl
                                    `}
                                    title="Cambiar tema"
                                    data-tooltip-id="temaLabel"
                                    data-tooltip-content="Cambiar tema"
                                    onClick={handleTheme}
                                >
                                    {isDark ? <MdOutlineWbSunny className="text-2xl" /> : <FaMoon className="text-2xl" />}
                                </button>
                                <ReactTooltip id="temaLabel" place="top" delayShow={100}/>
                                <UserAvatar
                                    user={user}
                                    isDark={isDark}
                                    size={33}
                                    placeTooltip="left"
                                    onClick={handleProfileCard}
                                />
                            </div>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <div className='flex justify-center items-center'>
                                    <UserAvatar
                                        user={user}
                                        isDark={isDark}
                                        size={36}
                                        onClick={handleProfileCard}
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
                                        onClick={handleTheme}
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
                </div>
            </div>
            {
                showProfileCard && (
                    <UserCard
                        isDark={isDark}
                        user={user}
                    />
                )
            }
            {/* Menú */}
            <div className='flex-1 flex overflow-x-auto items-center md:justify-center md:overflow-hidden'>
                {menuItems.map((item, index) => (
                    <SideBarItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        isDark={isDark}
                        onClick={handleMenuOptionClick}
                        isSelected={optionSelected === item.label}
                        isMobile={isMobile}
                    />
                ))}
            </div>
        </div>
    )
}

export default SideBar
