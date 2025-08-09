import React from 'react'
import { motion } from 'framer-motion';

const SideBarItem = ({ icon: Icon, label, isHovered, isDark }) => {
  return (
    <motion.div
      className={`flex justify-center rounded-lg p-2 mt-2 mb-2 transition-all duration-300 cursor-pointer
        ${isDark ? 'bg-gray-600 text-white border-gray-800' : 'bg-gray-300 text-gray-900 border-gray-400'}
        ${isHovered ? 'w-40' : 'w-14'}
      `}
      whileHover={{ scale: 1.05 }}
    >
      <Icon className="w-5 h-5" />
      {isHovered && (
        <motion.span
          className="ml-2 whitespace-nowrap overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}

export default SideBarItem
