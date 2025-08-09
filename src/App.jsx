import { useState } from 'react'
import './App.css'
import { Tooltip as ReactTooltip } from 'react-tooltip';
import SideBarItem from './components/SideBarItem';
import Logo from './assets/react.svg';

import { FaUsers } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { GoGraph } from "react-icons/go";

function App() {
  const [isDark, setIsDark] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const menuItems = [
    { icon: MdSpaceDashboard, label: 'Dashboard' },
    { icon: FaUsers, label: 'Usuarios' },
    { icon: FaShieldAlt, label: 'Roles' },
    { icon: BiSolidUserAccount, label: 'Avatares' },
    { icon: GoGraph, label: 'Estadísticas' },
  ];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`absolute top-5 left-3 h-[calc(100%-40px)]
        flex items-center flex-col
        ${isHovered ? 'w-45' : 'w-20'}
        shadow-lg z-50 border shadow-gray-300
        ${isDark ? 'bg-gray-800 text-white border-gray-300' : 'bg-gray-200 text-gray-900 border-gray-400'}
        rounded-lg p-2 overflow-y-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar transition-all duration-300
      `}
    >
      {/* Logo */}
      <div className="p-2 mb-2">
        <img src={Logo} alt="React Logo" className="w-10 h-10" />
      </div>

      {/* Menú */}
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
  );
}

export default App
