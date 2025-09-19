import React, { useState } from 'react'

import ProfileForm from '@components/ProfileForm';
import UserAccountActions from '@components/UserAccountActions';
import Modal from '@ui/Modal';

const EditUserModal = ({
    user,
    isOpen,
    onClose,
    isDark,
    handleUpdate,
    handleAvatarModal,
    handleRolesModal,
    handleActionModal
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        const success = await handleUpdate(formData);
        setIsLoading(false);
        if (success) {
            onClose();
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isDark={isDark}>
            <ProfileForm
                user={user}
                isDark={isDark}
                onSubmit={handleSubmit}
                handleAvatarModal={handleAvatarModal}
                handleRolesModal={handleRolesModal}
                isLoading={isLoading}
            />
            <UserAccountActions
                user={user}
                handleActionModal={handleActionModal}
                isDark={isDark}
            />
        </Modal>
    )
}

export default EditUserModal
