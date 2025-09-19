import React, { useState, useEffect, useRef } from 'react'
import UserAvatar from './UserAvatar';
import CustomInput from './CustomInput';
import RolesField from './RolesField';
import { IoIosSave } from 'react-icons/io';

import { useAuthContext } from '@contexts/AuthProvider';

const ProfileForm = ({
    user,
    isDark,
    onSubmit,
    handleAvatarModal,
    handleRolesModal,
    isLoading = false
}) => {
    const { user: authUser } = useAuthContext();
    const [enableButton, setEnableButton] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [formData, setFormData] = useState({
        id: user.id || '',
        name: user.name || '',
        email: user.email || '',
        roles: user.roles || []
    });

    const formRef = useRef(formData);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email') {
            setEmailMessage(value !== user.email
                ? '*Al cambiar el correo electrónico, se enviará un correo de verificación.'
                : ''
            );
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const onClickAvatar = () => {
        handleAvatarModal && handleAvatarModal();
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await onSubmit(formData);
        if (success) {
            formRef.current = formData;
            setEnableButton(false);
        }
    }

    useEffect(() => {
        const valuesForm = {...formData};
        Object.keys(valuesForm).forEach(key => {
            if (typeof valuesForm[key] === 'string') {
                valuesForm[key] = valuesForm[key].trim();
            }
        });

        const isChanged = JSON.stringify(formRef.current) !== JSON.stringify(valuesForm);
        setEnableButton(isChanged);
    }, [formData]);

    useEffect(() => {
        const newData = {
            id: user.id || '',
            name: user.name || '',
            email: user.email || '',
            roles: user.roles || []
        }
        formRef.current = newData;
        setFormData(newData);
    }, [user]);

    useEffect(() => {
        if (isLoading) {
            setEnableButton(false);
        }
    }, [isLoading]);

    return (
        <div className={`flex flex-col w-full gap-4 p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-white'} border-2 ${isDark ? 'border-gray-700' : 'border-gray-300'} transition-all duration-300 ease-in-out`}>
            <h2 className="text-2xl text-center font-bold">Editar perfil</h2>
            <div className="flex items-center justify-center">
                {/* Avatar del usuario */}
                <UserAvatar
                    user={user}
                    isDark={isDark}
                    {...(handleAvatarModal ? { onClick: onClickAvatar } : {})}
                    isLoading={isLoading}
                />
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} autoComplete='off'>
                {[{ placeholder: `${user.id !== authUser.id ? '' : 'Tu'} nombre de usuario`.trim(), name: "name", disabled: false, type: "username" },
                { placeholder: `${user.id !== authUser.id ? '' : 'Tu'} correo electrónico`.trim(), name: "email", disabled: false, type: "email", message: emailMessage },
                { placeholder: `${user.id !== authUser.id ? '' : 'Tus'} roles`.trim(), name: "roles", disabled: true, type: "security" }].map((field) => {
                    if (field.name !== "roles") {
                        return (
                            <CustomInput
                                key={field.name}
                                Itype={field.type}
                                Iname={field.name}
                                Imessage={field?.message || ''}
                                Ivalue={formData[field.name]}
                                IonChange={handleChange}
                                Iplaceholder={field.placeholder}
                                Idisabled={field.disabled}
                            />
                        );
                    } else {
                        return (
                            <RolesField
                                key={field.name}
                                field={field}
                                isDark={isDark}
                                userId={formData.id}
                                values={formData.roles}
                                onClick={() => handleRolesModal()}
                            />
                        );
                    }
                })}
                <button
                    type="submit"
                    className={`px-4 py-2 mb-3 rounded-lg font-bold transition-all duration-300
                        ${!enableButton || isLoading ? 'bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed'
                            : isDark ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-blue-400 hover:bg-blue-500'
                        }
                    `}
                    disabled={!enableButton || isLoading}
                    title={isLoading ? "Actualizando..." : "Guardar cambios"}
                >
                    <IoIosSave className="inline-block mr-2 text-2xl" />
                    Actualizar
                </button>
            </form>
        </div>
    )
}

export default ProfileForm
