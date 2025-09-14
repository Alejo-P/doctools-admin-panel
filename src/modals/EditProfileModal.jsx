import React, { useState } from 'react'

import { useAuthContext } from '@contexts/AuthProvider';
import ProfileForm from '@components/ProfileForm';
import PasswordForm from '@components/PasswordForm';
import Modal from '@ui/Modal';

const EditProfileModal = ({
    user,
    isOpen,
    onClose,
    isDark,
    handleRolesModal,
    handleAvatarModal
}) => {
    const { updateProfile, updatePassword } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateProfile = async (userData) => {
        setIsLoading(true);
        const success = await updateProfile(userData);
        setIsLoading(false);
        if (success) {
            onClose();
        }
    };

    const handleUpdatePassword = async (passwordData) => {
        setIsLoading(true);
        const success = await updatePassword(passwordData);
        setIsLoading(false);
        if (success) {
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isDark={isDark}>
            <ProfileForm
                user={user}
                isDark={isDark}
                onSubmit={handleUpdateProfile}
                handleAvatarModal={handleAvatarModal}
                handleRolesModal={handleRolesModal}
                isLoading={isLoading}
            />
            <PasswordForm
                isDark={isDark}
                onSubmit={handleUpdatePassword}
                isLoading={isLoading}
            />
        </Modal>
    );
};

export default EditProfileModal;
