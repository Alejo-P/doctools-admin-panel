import React, { useState, useEffect } from 'react'

import { useAdminContext } from '@contexts/AdminProvider'
import { useAppContext } from '@contexts/AppProvider';
import UserCard from '@components/UserCard';
import LoadingCard from '@components/LoadingCard';

const UsersManagerPage = () => {
    const { isDark } = useAppContext();
    const { getAllUsers, usersList, loading } = useAdminContext();
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleFetchUsers = async () => {
        setSelectedUser(null);
        setShowCreateUserModal(false);
        await getAllUsers();
    }

    useEffect(() => {
        if (!usersList.length) {
            handleFetchUsers();
        }
    }, []);
    return (
        <div className='flex flex-col w-full h-full gap-2'>
            {loading ? <LoadingCard /> : (
                usersList.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        isDark={isDark}
                        onEdit={() => {
                            setSelectedUser(user);
                            setShowActionModal(true);
                        }}
                        onDelete={() => {
                            setSelectedUser(user);
                            setShowActionModal(true);
                        }}
                    />
                ))
            )}
        </div>
    )
}

export default UsersManagerPage
