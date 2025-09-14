// @ts-check
import React, { useState } from 'react';
import { FaUserPlus } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

import { useAdminContext } from '@contexts/AdminProvider';
import CustomInput from '@components/CustomInput';
import Modal from '@ui/Modal';

const CreateUserModal = ({
    isOpen,
    handleModal,
    isDark
}) => {
    const { registerUser } = useAdminContext();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const disabled = !userData.name.trim() || !userData.email.trim() || !userData.password.trim();

    const handleClose = () => {
        setTimeout(() => handleModal(), 200);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await registerUser(userData);
        setLoading(false);
        if (success) {
            setUserData({
                name: '',
                email: '',
                password: ''
            });
            handleModal();
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isDark={isDark}>
            <h2 className="mb-4 text-2xl font-bold text-center">Crear Usuario</h2>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4" id='createUserForm' autoComplete='off'>
                    <CustomInput
                        Itype="text"
                        Iname="name"
                        Iplaceholder="Nombre"
                        Ivalue={userData.name}
                        IonChange={handleChange}
                        Irequired
                    />
                    <CustomInput
                        Itype="email"
                        Iname="email"
                        Iplaceholder="Correo Electrónico"
                        Ivalue={userData.email}
                        IonChange={handleChange}
                        Irequired
                    />
                    <CustomInput
                        Itype="password"
                        Iname="password"
                        Iplaceholder="Contraseña"
                        Ivalue={userData.password}
                        IonChange={handleChange}
                        Irequired
                    />
                </form>
                <div className="w-full flex justify-end gap-4">
                    <button
                        type="submit"
                        form="createUserForm"
                        className={`p-2 rounded-lg transition-all duration-300
                            ${(disabled || loading)? 'cursor-not-allowed bg-gray-300 text-gray-500'
                                : isDark ? 'bg-green-600 text-white'
                                : 'bg-green-400 text-gray-900 hover:bg-gray-400'
                            }
                            hover:scale-95 shadow-lg hover:shadow-xl`}
                        data-tooltip-id='createQRLabel'
                        data-tooltip-content={`${!disabled ? 'Crear usuario' : 'Los campos son obligatorios'}`}
                        disabled={disabled || loading}
                    >
                        {loading 
                            ? (
                                <span className="flex items-center gap-2 font-bold">
                                    <span className="animate-spin"><ImSpinner9 className="text-2xl" /></span>
                                    Creando...
                                </span>
                            ) : (
                                <span className='flex items-center gap-2 font-bold'>
                                    <FaUserPlus className="text-2xl" />
                                    Crear usuario
                                </span>
                            )
                        }
                    </button>
                </div>
        </Modal>
    )
}

export default CreateUserModal