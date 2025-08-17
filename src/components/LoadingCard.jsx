import React from 'react';
import { ImSpinner9 } from "react-icons/im"; // Ícono de carga

// Importamos el contexto
import { useAppContext } from '@contexts/AppProvider';

const LoadingCard = () => {
    const { isDark } = useAppContext();

    return (
        <div className={`flex items-center flex-1 justify-center transition-opacity animate-fadeIn`}>
            {/* Contenedor de la tarjeta de carga */}
            <div className={`rounded-lg shadow-lg p-6 flex flex-col items-center justify-center space-y-4
                ${isDark ? 'text-white bg-gray-900 shadow-gray-700' : 'text-gray-900 bg-white shadow-gray-300'}
            `}>
                {/* Ícono animado */}
                <div className={`flex items-center justify-center bg-gray-200 rounded-full h-20 w-20
                    ${isDark ? 'text-white bg-gray-700' : 'text-gray-900 bg-gray-200'}
                `}>
                    <ImSpinner9 className="w-12 h-12 animate-spin" />
                </div>
                {/* Texto */}
                <p className={`text-lg font-semibold
                    ${isDark ? 'text-white' : 'text-gray-700'}
                `}>
                    Cargando...
                </p>
            </div>
        </div>
    );
};

export default LoadingCard;
