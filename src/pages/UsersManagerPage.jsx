import React, { useState, useEffect } from 'react'
import { LuMousePointerClick } from "react-icons/lu";

import { useAdminContext } from '@contexts/AdminProvider';
import { useAppContext } from '@contexts/AppProvider';
import UserCard from '@components/UserCard';
import ProfileForm from '@components/ProfileForm';
import EditUserModal from '@modals/EditUserModal';
import LoadingCard from '@components/LoadingCard';

const UsersManagerPage = () => {
    const { isDark, isMobile } = useAppContext();
    const { getAllUsers, usersList, loading, updateUser } = useAdminContext();
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showUserProfileModal, setShowUserProfileModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleFetchUsers = async () => {
        setSelectedUser(null);
        setShowCreateUserModal(false);
        await getAllUsers();
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
                    {
                        !isMobile && (
                            <div className='flex overflow-y-auto pl-2 scrollbar flex-col gap-2 w-full h-full'>
                                {
                                    !selectedUser ? (
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
                                                handleRolesModal={() => { }}
                                                isLoading={loading}
                                            />
                                        </>
                                    )
                                }
                            </div>
                        )
                    }
                    {
                        (isMobile && showUserProfileModal) && (
                            <EditUserModal
                                user={selectedUser}
                                isOpen={showUserProfileModal}
                                onClose={handleCloseEditModal}
                                isDark={isDark}
                                handleUpdate={handleUpdateUser}
                            />
                        )
                    }
                </div>
            )}
        </>
    )
}

export default UsersManagerPage
