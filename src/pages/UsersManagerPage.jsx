import React, { useState, useEffect } from 'react'
import { LuMousePointerClick } from "react-icons/lu";

import { useAdminContext } from '@contexts/AdminProvider';
import { useAuthContext } from '@contexts/AuthProvider';
import { useAppContext } from '@contexts/AppProvider';
import UserCard from '@components/UserCard';
import ProfileForm from '@components/ProfileForm';
import PasswordForm from '@components/PasswordForm';
import LoadingCard from '@components/LoadingCard';

const UsersManagerPage = () => {
    const { isDark, isMobile } = useAppContext();
    const { user } = useAuthContext();
    const { getAllUsers, usersList, loading } = useAdminContext();
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleFetchUsers = async () => {
        setSelectedUser(null);
        setShowCreateUserModal(false);
        await getAllUsers();
    }

    const handleSelectUser = (user) => {
        if (user.id === selectedUser?.id) {
            setSelectedUser(null);
            setShowActionModal(false);
        } else {
            setSelectedUser(user);
            setShowActionModal(true);
        }
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
                                        <div className={`flex flex-col items-center justify-center h-full gap-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-white'} p-4`}>
                                            <div className={`flex items-center justify-center p-4 rounded-lg
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
                                                onSubmit={handleFetchUsers}
                                                handleAvatarModal={() => { }}
                                                handleRolesModal={() => { }}
                                                isLoading={loading}
                                            />
                                            {
                                                selectedUser.id === user.id && (
                                                    <PasswordForm
                                                        isDark={isDark}
                                                        onSubmit={handleFetchUsers}
                                                        isLoading={loading}
                                                    />
                                                )
                                            }
                                        </>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            )}
        </>
    )
}

export default UsersManagerPage
