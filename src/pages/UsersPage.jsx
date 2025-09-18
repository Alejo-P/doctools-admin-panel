import React, { useState, useEffect } from 'react'
import { LuMousePointerClick } from "react-icons/lu";
import { MdOutlineRefresh } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";

import { useAdminContext } from '@contexts/AdminProvider';
import { useAppContext } from '@contexts/AppProvider';
import UserCard from '@components/UserCard';
import ProfileForm from '@components/ProfileForm';
import EditUserModal from '@modals/EditUserModal';
import UserAccountActions from '@components/UserAccountActions';
import LoadingCard from '@components/LoadingCard';
import RoleActionModal from '@modals/RoleActionModal';
import CreateUserModal from '@modals/CreateUserModal';
import ActionProfileModal from '@modals/ActionProfileModal';

const UsersPage = () => {
    const { isDark, isMobile, setShowActions, setActionItems } = useAppContext();
    const { getAllUsers, usersList, loading, updateUser, getRolesList, rolesList, sendVerifyEmail } = useAdminContext();
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showUserProfileModal, setShowUserProfileModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showRolesModal, setShowRolesModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);

    const handleFetchUsers = async () => {
        setShowActions(false);
        setSelectedUser(null);
        setShowCreateUserModal(false);
        await getAllUsers();
        await getRolesList();
        setShowActions(true);
    }

    const handleRolesModal = (newRoles) => {
        setShowRolesModal(!showRolesModal);
        // Actualiza la lista de roles en la vista (si el usuario es distinto al autenticado)
        if (Array.isArray(newRoles)) {
            setSelectedUser({ ...selectedUser, roles: newRoles });
        }
    }

    const handleCreateUserModal = () => {
        setShowCreateUserModal(!showCreateUserModal);
    }

    const handleActionModal = async () => {
        if (!selectedUser) return;
        setShowActionModal(!showActionModal);
    }

    const handleSendVerifyEmail = async () => {
        if (!selectedUser) return;
        const confirm = window.confirm("¿Estás seguro de que deseas enviar un correo de verificación?");
        if (!confirm) return;
        await sendVerifyEmail(selectedUser.id);
    }

    const handleSelectUser = (user) => {
        if (user.id === selectedUser?.id) {
            setSelectedUser(null);
            setShowUserProfileModal(false);
        } else {
            setSelectedUser(user);
            setShowUserProfileModal(true);
        }
    }

    const handleCloseEditModal = () => {
        setShowUserProfileModal(false);
        setSelectedUser(null);
    }

    const handleUpdateUser = async (userData) => {
        const success = await updateUser(selectedUser.id, userData);
        return success;
    }
    
    useEffect(() => {
        const actions = [
            {
                key: 'Crear usuario',
                element: (
                    <button
                    onClick={handleCreateUserModal}
                    className={`p-2 rounded-lg transition-all duration-300
                        ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'} 
                        hover:scale-95 shadow-lg hover:shadow-xl`}
                        title="Crear usuario"
                        data-tooltip-id="addUserLabel"
                        data-tooltip-content="Crear nuevo usuario"
                        >
                        <span className="text-3xl">
                            <IoPersonAdd className='text-2xl'/>
                        </span>
                    </button>
                )
            },
            {
                key: 'Refrescar',
                element: (
                    <button
                    onClick={() => handleFetchUsers()}
                    className={`p-2 rounded-lg transition-all duration-300
                        ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'} 
                        hover:scale-95 shadow-lg hover:shadow-xl`}
                        title="Refrescar lista de usuarios"
                        data-tooltip-id="refreshLabel"
                        data-tooltip-content="Refrescar lista de usuarios"
                        >
                        <span className="text-3xl">
                            <MdOutlineRefresh className='text-2xl'/>
                        </span>
                    </button>
                )
            }
        ]
        setActionItems(actions);
        return () => setActionItems([]);
    }, [isDark, usersList]);

    useEffect(() => {
        if (usersList.length && usersList.find(u => u.id === selectedUser?.id)) {
            setSelectedUser(usersList.find(u => u.id === selectedUser?.id));
        }
    }, [usersList])
    
    useEffect(() => {
        if (!usersList.length) {
            handleFetchUsers();
        }
    }, []);

    return (
        <>
            {loading ? <LoadingCard /> : (
                <div className={` w-full h-full
                    ${isMobile ? 'flex flex-col' : 'grid grid-cols-[40%_60%]'}
                `}>
                    <div className='flex flex-col gap-1 flex-1 lg:border-r lg:pr-2 overflow-y-auto scrollbar'>
                        {
                            usersList.map(user => (
                                <UserCard
                                    key={user.id}
                                    user={user}
                                    isDark={isDark}
                                    isMobile={isMobile}
                                    isSelected={selectedUser?.id === user.id}
                                    onClick={handleSelectUser}
                                />
                            ))
                        }
                    </div>
                    {!isMobile && (
                        <div className='flex overflow-y-auto pl-2 scrollbar flex-col gap-2 w-full h-full'>
                            {!selectedUser ? (
                                <div className={`flex flex-col items-center justify-center h-full gap-4 rounded-lg transition-all duration-300 ease-in-out ${isDark ? 'bg-gray-900' : 'bg-white'} p-4`}>
                                    <div className={`flex items-center justify-center p-4 rounded-lg transition-all duration-300 ease-in-out
                                        ${isDark ? 'bg-gray-800' : 'bg-gray-300'}
                                    `}>
                                        <LuMousePointerClick className='text-2xl' />
                                    </div>
                                    <p>Selecciona un usuario para editar su perfil</p>
                                </div>
                            ) : (
                                <>
                                    <ProfileForm
                                        user={selectedUser}
                                        isDark={isDark}
                                        onSubmit={handleUpdateUser}
                                        handleAvatarModal={() => { }}
                                        handleRolesModal={handleRolesModal}
                                        isLoading={loading}
                                    />
                                    <UserAccountActions
                                        user={selectedUser}
                                        handleActionModal={handleActionModal}
                                        onSendVerifyEmail={handleSendVerifyEmail}
                                        isDark={isDark}
                                    />
                                </>
                            )}
                        </div>
                    )}
                    {(isMobile && showUserProfileModal) && (
                        <EditUserModal
                            user={selectedUser}
                            isOpen={showUserProfileModal}
                            onClose={handleCloseEditModal}
                            isDark={isDark}
                            handleUpdate={handleUpdateUser}
                            handleRolesModal={handleRolesModal}
                            handleActionModal={handleActionModal}
                        />
                    )}
                    {showRolesModal && (
                        <RoleActionModal
                            isOpen={showRolesModal}
                            handleModal={handleRolesModal}
                            userInfo={selectedUser}
                            isDark={isDark}
                            roleList={rolesList}
                        />
                    )}
                    {showCreateUserModal && (
                        <CreateUserModal
                            isOpen={showCreateUserModal}
                            handleModal={handleCreateUserModal}
                            isDark={isDark}
                        />
                    )}
                    {showActionModal && (
                        <ActionProfileModal
                            isOpen={showActionModal}
                            handleModal={handleActionModal}
                            setUserInfo={setSelectedUser}
                            actionType={selectedUser?.is_active ? 'disable' : 'enable'}
                            userInfo={selectedUser}
                            isDark={isDark}
                        />
                    )}
                </div>
            )}
        </>
    )
}

export default UsersPage
