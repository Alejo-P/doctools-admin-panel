// @ts-check
import { useState, useEffect } from 'react'
import CustomInput from './CustomInput';
import { IoIosSave } from 'react-icons/io';

const PasswordForm = ({
    isDark,
    onSubmit,
    isLoading = false
}) => {
    const [enableButton, setEnableButton] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordFormData, setPasswordFormData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(passwordFormData);
    }

    useEffect(() => {
        const { password, newPassword, confirmPassword } = passwordFormData;
        setEnableButton(!!password && !!newPassword && !!confirmPassword);
    }, [passwordFormData]);

    useEffect(() => {
        if (isLoading || passwordError != '') {
            setEnableButton(false);
        }
    }, [isLoading, passwordError]);

    useEffect(() => {
        const { password, newPassword, confirmPassword } = passwordFormData;
        const isPasswordFilled = password.trim() !== '' && newPassword.trim() !== '' && confirmPassword.trim() !== '';

        if (!isPasswordFilled) {
            setPasswordError('');
            setEnableButton(false);
        } else if (newPassword !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            setEnableButton(false);
        } else if (newPassword === password) {
            setPasswordError('La nueva contraseña no puede ser igual a la actual');
            setEnableButton(false);
        } else if (newPassword.length > 20 || password.length > 20) {
            setPasswordError('La contraseña no puede tener más de 20 caracteres');
            setEnableButton(false);
        } else if (newPassword.length < 8 || password.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres');
            setEnableButton(false);
        } else {
            setPasswordError('');
            setEnableButton(true);
        }
    }, [passwordFormData]);

    return (
        <div className={`flex flex-col w-full gap-4 p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-white'} border-2 ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
            <h2 className="text-2xl text-center font-bold">Actualizar contraseña</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} autoComplete='off'>
                {[
                    { placeholder: "Ingresa tu contraseña actual", name: "password", disabled: false, type: "password" },
                    { placeholder: "Ingresa la nueva contraseña", name: "newPassword", disabled: false, type: "password" },
                    { placeholder: "Ingresa nuevamente la contraseña", name: "confirmPassword", disabled: false, type: "password" }
                ].map((field, index) => (
                    <CustomInput
                        key={index}
                        Itype={field.type}
                        Iname={field.name}
                        Ivalue={passwordFormData[field.name]}
                        IonChange={handleChange}
                        Iplaceholder={field.placeholder}
                        Idisabled={field.disabled}
                    />
                ))}
                {passwordError && (
                    <span className="text-red-500 text-sm font-medium -mt-2">{passwordError}</span>
                )}
                <button
                    type="submit"
                    className={`px-4 py-2 mb-3 rounded-lg font-bold transition-all duration-300
                        ${!enableButton || isLoading ? 'bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed'
                            : isDark ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }
                    `}
                    disabled={!enableButton || isLoading}
                    title={isLoading ? "Actualizando..." : "Cambiar contraseña"}
                >
                    <IoIosSave className="inline-block mr-2 text-2xl" />
                    Cambiar contraseña
                </button>
            </form>
        </div>
    )
}

export default PasswordForm
