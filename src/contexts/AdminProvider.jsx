import { createContext, useContext, useState, useMemo, use } from 'react';
import { useAppContext } from './AppProvider';
import { useAuthContext } from './AuthProvider';
import { useAxios } from '@hooks/useAxios';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const { handleNotificacion } = useAppContext();
    const { user, setUser } = useAuthContext();
    const { request } = useAxios(); // ¡aquí la magia!
    const [usersList, setUsersList] = useState([]);
    const [rolesList, setRolesList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllUsers = async () => {
        setLoading(true);
        const response = await request({
            method: 'get',
            url: '/users',
            notify: {
                success: true,
                error: true
            }
        });

        if (response) {
            setUsersList(response);
        }
        setLoading(false);
    }

    const getUserById = async (userId) => {
        setLoading(true);
        const response = await request({
            method: 'get',
            url: `/user/${userId}`,
            notify: {
                success: true,
                error: true
            }
        });

        setLoading(false);
        return response;
    }

    const enableUser = async (userId, reason) => {
        const response = await request({
            method: 'post',
            url: `/user/activate`,
            payload: {
                user_id: userId,
                reason: reason
            },
            notify: {
                success: true,
                error: true
            }
        });
    
        if (response) {
            setUsersList((prev) => prev.map((user) => {
                if (user.id === userId){
                    return { ...user, is_active: true };
                }
                return user;
            }));
            handleNotificacion('success', response.msg, 5000);
        }

        const success = response ? true : false;
        return success;
    }

    const disableUser = async (userId, reason) => {
        const response = await request({
            method: 'post',
            url: `/user/deactivate`,
            payload: {
                user_id: userId,
                reason: reason
            },
            notify: {
                success: true,
                error: true
            }
        });

        if (response) {
            setUsersList((prev) => prev.map((user) => {
                if (user.id === userId){
                    return { ...user, is_active: false };
                }
                return user;
            }));
            handleNotificacion('success', response.msg, 5000);
        }

        const success = response ? true : false;
        return success;
    }

    const updateUser = async (userId, data) => {
        setLoading(true);
        const response = await request({
            method: 'put',
            url: `/user/${userId}`,
            payload: data,
            notify: {
                success: true,
                error: true
            }
        });
        if (response) {
            setUsersList((prev) => prev.map((user) => {
                if (user.id === userId){
                    return { ...user, ...data };
                }
                return user;
            }));
            handleNotificacion('success', response.msg, 5000);
        }

        setLoading(false);
        return response;
    }

    const updateUserPassword = async (userId, data) => {
        setLoading(true);
        const passData = {
            current_password: data.password,
            new_password: data.newPassword,
            confirm_password: data.confirmPassword
        };
        const response = await request({
            method: 'put',
            url: `/user/change-password/${userId}`,
            payload: passData,
            notify: {
                success: true,
                error: true
            }
        });
        if (response) {
            handleNotificacion('success', response.msg, 5000);
        }

        setLoading(false);
        return response;
    }

    const addRole = async (role, user_id) => {
        const response = await request({
            method: 'post',
            url: '/add_role',
            payload: {
                role_name: role,
                user_id: user_id
            },
            notify: {
                success: false,
                error: true
            }
        });

        if (response) {
            handleNotificacion('success', 'Rol añadido correctamente', 5000);

            // Actualizar el estado del usuario en el contexto (solo si el usuario autenticado es el mismo) 
            if (user.id === user_id) {
                const updatedUser = { ...user };
                if (!updatedUser.roles) {
                    updatedUser.roles = [];
                }
                updatedUser.roles.push(role);
                setUser(updatedUser);
            }
            // Actualizar la lista de usuarios en el contexto
            // para reflejar el cambio en los roles del usuario
            setUsersList((prev) => prev.map((user) => {
                if (user.id === user_id){
                    return { ...user, roles: [...user.roles, role] };
                }
                return user;
            }));
        }
    }

    const removeRole = async (role, user_id) => {
        const response = await request({
            method: 'delete',
            url: '/remove_role',
            payload: {
                role_name: role,
                user_id: user_id
            },
            notify: {
                success: false,
                error: true
            }
        });

        if (response) {
            handleNotificacion('success', 'Rol eliminado correctamente', 5000);

            // Actualizar el estado del usuario en el contexto (solo si el usuario autenticado es el mismo) 
            if (user.id === user_id) {
                const updatedUser = { ...user };
                if (updatedUser.roles) {
                    updatedUser.roles = updatedUser.roles.filter(r => r !== role);
                }
                setUser(updatedUser);
            }
            // Actualizar la lista de usuarios en el contexto
            // para reflejar el cambio en los roles del usuario
            setUsersList((prev) => prev.map((user) => {
                if (user.id === user_id){
                    return { ...user, roles: user.roles.filter(r => r !== role) };
                }
                return user;
            }));
        }
    }

    const getRolesList = async () => {
        const response = await request({
            method: 'get',
            url: '/roles',
            notify: {
                success: true,
                error: true
            }
        });

        if (response) {
            setRolesList(response);
        }
    }

    const sendVerfyEmail = (userId) => {
        setLoading(true);
        const response = request({
            method: 'post',
            url: `/send-verification-email/${userId}`,
            notify: {
                success: true,
                error: true
            }
        });

        if (response) {
            handleNotificacion('success', response.msg, 5000);
        }
        setLoading(false);
    }

    const contextValue = useMemo(() => ({
        loading,
        usersList,
        rolesList,
        setRolesList,
        setUsersList,
        getAllUsers,
        getUserById,
        enableUser,
        disableUser,
        sendVerfyEmail,
        updateUser,
        updateUserPassword,
        setLoading,
        addRole,
        removeRole,
        getRolesList
    }), [usersList, loading, rolesList]);
    
    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdminContext must be used within an AdminProvider');
    }
    return context;
};