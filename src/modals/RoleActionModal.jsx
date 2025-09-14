import React, { useState } from 'react';
import { ImSpinner9 } from "react-icons/im";
import { LuShieldCheck } from "react-icons/lu";
import { useAdminContext } from '@contexts/AdminProvider';
import RolesField from '@components/RolesField';
import Modal from '@ui/Modal';

const RoleActionModal = ({
    isOpen,
    handleModal,
    roleList,
    userInfo,
    isDark
}) => {
    const { addRole, removeRole } = useAdminContext();
    const initialRoles = userInfo.roles || [];
    const [roles, setRoles] = useState([...userInfo.roles]);
    const [loading, setLoading] = useState(false);

    const availableRoles = roleList
        .map(role => role.name)
        .filter(role => !roles.includes(role));

    const hasChanges = () => {
        const added = roles.filter(role => !initialRoles.includes(role));
        const removed = initialRoles.filter(role => !roles.includes(role));
        return added.length > 0 || removed.length > 0;
    };

    const disabled = !hasChanges();

    const handleAddRole = (role) => {
        if (!roles.includes(role)) {
            setRoles(prev => [...prev, role]);
        }
    };

    const handleDeleteRole = (role) => {
        setRoles(prev => prev.filter(r => r !== role));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const addedRoles = roles.filter(r => !initialRoles.includes(r));
            const removedRoles = initialRoles.filter(r => !roles.includes(r));

            for (const role of removedRoles) {
                await removeRole(role, userInfo.id);
            }

            for (const role of addedRoles) {
                await addRole(role, userInfo.id);
            }

            handleClose(roles);
        } catch (err) {
            console.error("Error al enviar cambios de rol:", err);
        } finally {
            setLoading(false);
        }
    };

    // Cierra el modal después de un pequeño retraso
    const handleClose = (newRoles) => {
        setTimeout(() => handleModal(newRoles || false), 200);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => handleClose()} isDark={isDark}>
            <h1 className="mb-4 text-2xl font-bold text-center">
                Acciones de rol
            </h1>
            <form id="rolesForm" className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                <RolesField
                    field={{ placeholder: "Tus roles", name: "roles", disabled: true, type: "security" }}
                    isDark={isDark}
                    userId={userInfo.id}
                    values={roles}
                    onDeleteEachRole={handleDeleteRole}
                />
                <RolesField
                    field={{ placeholder: "Agregar roles", name: "roles", disabled: true, type: "choice" }}
                    isDark={isDark}
                    userId={userInfo.id}
                    values={availableRoles}
                    onAddEachRole={handleAddRole}
                />
                <div className="flex justify-end">
                    <button
                        type='submit'
                        form='rolesForm'
                        className={`p-2 rounded-lg transition-all duration-300
                            ${(disabled || loading) ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                                : isDark ? 'bg-blue-600 text-white'
                                : 'bg-blue-400 text-gray-900 hover:bg-gray-400'}
                            hover:scale-95 shadow-lg hover:shadow-xl`}
                        title="Guardar"
                        data-tooltip-id='guardarLabel'
                        data-tooltip-content={`${disabled ? 'Selecciona un rol primero' : 'Guardar cambios'}`}
                        disabled={disabled || loading}
                    >
                        {loading
                            ? (
                                <span className="flex items-center gap-2 font-bold">
                                    <span className="animate-spin"><ImSpinner9 className="text-2xl" /></span>
                                    Guardando...
                                </span>
                            ) : (
                                <span className='flex items-center gap-2 font-bold'>
                                    <LuShieldCheck className="text-2xl" />
                                    Guardar cambios
                                </span>
                            )
                        }
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default RoleActionModal;
