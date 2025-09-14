import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from "react-icons/io5";

const Modal = ({
    isOpen,
    onClose,
    isDark,
    children
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                >
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={onClose}
                    />

                    {/* Contenedor del modal */}
                    <motion.div
                        className={`
                            relative z-10 flex flex-col w-full max-w-2xl max-h-[90vh] 
                            ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'} 
                            rounded-xl shadow-xl p-4 overflow-hidden
                        `}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        {/* Botón de cerrar */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className={`
                                absolute top-3 left-3 p-1 rounded-full shadow-md transition-colors
                                ${isDark ? 'bg-red-700 hover:bg-gray-600' : 'bg-red-400 hover:bg-gray-500'}
                            `}
                        >
                            <IoClose className="text-xl" />
                        </motion.button>

                        {/* Contenido scrollable */}
                        <div className={`flex flex-col gap-4 p-4 rounded-lg 
                            ${isDark ? 'bg-gray-900' : 'bg-white'} 
                            w-full h-full overflow-y-auto scrollbar
                        `}>
                            {children}
                        </div>  
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal
