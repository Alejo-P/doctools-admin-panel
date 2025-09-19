import React from 'react'

import Modal from '@ui/Modal';

const LogoutModal = ({
    isOpen,
    onClose,
    handleLogout,
    isDark
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isDark={isDark}>
            <div className="p-6 max-w-sm mx-auto">
                <h2 className="text-xl md:text-2xl text-center font-bold mb-2">
                    Cerrar sesión
                </h2>
                <p className="text-center  mb-6">
                    ¿Estás seguro que deseas cerrar sesión?
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                        ${isDark 
                            ? 'bg-gray-700 text-white hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}
                        hover:scale-95 shadow`}
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                        ${isDark 
                            ? 'bg-red-600 text-white hover:bg-red-500' 
                            : 'bg-red-500 text-white hover:bg-red-400'}
                        hover:scale-95 shadow`}
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default LogoutModal
