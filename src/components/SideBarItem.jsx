import React from 'react'
import { motion } from 'framer-motion';

const SideBarItem = ({ icon: Icon, label, isHovered, isDark }) => {
  return (
    <motion.div
      className={`flex rounded-lg p-2 mt-2 mb-2 transition-all duration-300 cursor-pointer border
        ${isDark ? 'bg-gray-600 text-white border-gray-300' : 'bg-gray-300 text-gray-900 border-gray-600'}
        ${isHovered ? 'w-40 justify-start' : 'w-14 justify-center'}
      `}
      whileHover={{ scale: 1.05 }}
    >
      <Icon className="w-5 h-5" />
      {isHovered && (
        <motion.span
          className="ml-2 whitespace-nowrap overflow-hidden"
          title={label}
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
