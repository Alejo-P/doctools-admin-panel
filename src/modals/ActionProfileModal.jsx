import React, { useState, useEffect } from 'react'
import { FaUserCheck, FaUserMinus } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

// Importamos el contexto
import { useAdminContext } from '@contexts/AdminProvider';

// Importamos los componentes
import CustomInput from '@components/CustomInput';
import Modal from '@ui/Modal';

const ActionProfileModal = ({
    isOpen,
    handleModal,
    isDark,
    userInfo,
    setUserInfo,
    actionType
}) => {
    const { enableUser, disableUser } = useAdminContext();
    const [reason, setReason] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setTimeout(() => {
            handleModal();
        }, 200);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let success = false;
        if (actionType === 'enable') {
            success = await enableUser(userInfo.id, reason);
            if (success) {
                setUserInfo({
                    ...userInfo,
                    is_active: true
                });
                handleClose();
            }
        } else if (actionType === 'disable') {
            success = await disableUser(userInfo.id, reason);
            if (success) {
                setUserInfo({
                    ...userInfo,
                    is_active: false
                });
                handleClose();
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        setDisabled(reason === '');
    }, [reason]);

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isDark={isDark}>
            <h2 className={`text-2xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {actionType === 'enable' ? 'Activar usuario' : 'Desactivar usuario'}
            </h2>
            <form id='actionForm' onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
                <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {`¿Estás seguro de que deseas ${actionType === 'enable' ? 'activar' : 'desactivar'} a `}
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {userInfo.name}
                    </span>
                    {`?`}
                </p>
                <CustomInput
                    Itype='text'
                    Ilabel='Razón'
                    Ivalue={reason}
                    IsetValue={setReason}
                    IonChange={(e) => setReason(e.target.value)}
                    Iplaceholder='Escribe la razón aquí...'
                    IisDark={isDark}
                    Irequired
                />
            </form>
            <div className="w-full flex justify-end gap-4 mt-4">
                <button
                    type='submit'
                    form='actionForm'
                    className={`p-2 rounded-lg transition-all duration-300
                        ${disabled || loading ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                        : isDark ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-95'
                        : 'bg-blue-400 text-gray-900 hover:bg-blue-500 hover:scale-95'
                        }
                        shadow-lg hover:shadow-xl`}
                    disabled={disabled || loading}
                    title={"Action"}
                    data-tooltip-id='actionLabel'
                    data-tooltip-content={`${disabled ? 'Completa todos los campos' : 'Realizar acción'}`}
                >
                    {loading
                        ? (
                            <span className="flex items-center gap-2 font-bold">
                                <span className="animate-spin"><ImSpinner9 className="text-2xl" /></span>
                                Procesando...
                            </span>
                        )
                        : actionType === 'enable'
                            ? (
                                <span className="flex items-center gap-2 font-bold">
                                    <FaUserCheck className="text-2xl" />
                                    Activar
                                </span>
                            )
                            : (
                                <span className="flex items-center gap-2 font-bold">
                                    <FaUserMinus className="text-2xl" />
                                    Desactivar
                                </span>
                            )
                    }
                </button>
            </div>
        </Modal>
    )
}

export default ActionProfileModal
