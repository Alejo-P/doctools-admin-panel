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
    handleRolesModal
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDisableProfile = async () => {
        // Logic to disable user profile
    }

    const handleEnableProfile = async () => {
        // Logic to enable user profile
    }

    const handleSendVerifyEmail = async () => {
        // Logic to send verification email
    }

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
                handleRolesModal={handleRolesModal}
                isLoading={isLoading}
            />
            <UserAccountActions
                user={user}
                onDisableProfile={handleDisableProfile}
                onEnableProfile={handleEnableProfile}
                onSendVerifyEmail={handleSendVerifyEmail}
                isDark={isDark}
            />
        </Modal>
    )
}

export default EditUserModal
