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

import SideBarItem from './SideBarItem';
import UserAvatar from './UserAvatar';
import Logo from '../assets/react.svg';

const SideBar = ({
    isDark,
    user,
    changeTheme
}) => {
    const [isHovered, setIsHovered] = useState(false)
    
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
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`absolute top-5 left-3 h-[calc(100%-40px)]
        flex items-center justify-between flex-col
        ${isHovered ? 'w-45' : 'w-20'}
        shadow-lg z-50 border shadow-gray-300
        ${isDark ? 'bg-gray-800 text-white border-gray-300' : 'bg-gray-200 text-gray-900 border-gray-400'}
        rounded-lg p-2 overflow-y-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar transition-all duration-300
      `}
        >
            {/* Logo */}
            <div className="flex items-center justify-center mt-4">
                <img src={Logo} alt="React Logo" className="w-10 h-10" />
            </div>

            {/* Menú */}
            <div>
                {menuItems.map((item, index) => (
                    <SideBarItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        isHovered={isHovered}
                        isDark={isDark}
                    />
                ))}
            </div>

            <div className="p-2 mb-2 flex flex-row items-center justify-center gap-2">
                <UserAvatar
                    user={user}
                    isDark={isDark}
                    size={35}
                    placeTooltip="left"
                />
                {isHovered && (
                    <>
                        <button
                            className={`p-2 rounded-lg transition-all duration-300
                    ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'} 
                    hover:scale-95 shadow-lg hover:shadow-xl`}
                            title="Cambiar tema"
                            data-tooltip-id="temaLabel"
                            data-tooltip-content="Cambiar tema"
                            onClick={handleTheme}
                        >
                            {isDark ? <MdOutlineWbSunny className="text-2xl" /> : <FaMoon className="text-2xl" />}
                        </button>
                        <ReactTooltip id="temaLabel" place="top" delayShow={100}>
                            <div className={`p-2 rounded-lg shadow-lg
                    ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
                `}
                            />
                        </ReactTooltip>
                    </>
                )}
            </div>
        </div>
    )
}

export default SideBar
