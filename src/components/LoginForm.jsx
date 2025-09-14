import React , { useState, useEffect } from 'react'
import { IoLogIn } from "react-icons/io5";
import CustomInput from './CustomInput';

const LoginForm = ({
    isDark,
    handleLogin,
    isLoading = false
}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        is_panel_admin: true
    });
    const [disableButton, setDisableButton] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(formData);
    };

    useEffect(() => {
        setDisableButton(Object.values(formData).some(field => field === ''));
    }, [formData]);

    return (
        <div className={`p-6 rounded-lg shadow-lg w-4/5 max-w-screen-sm border md:min-w-[525px]
            ${isDark ? 'bg-gray-900 text-white border-gray-400' : 'bg-white text-gray-900 border-gray-600'}
            relative flex flex-col items-center max-h-screen overflow-auto`
        }>
            <IoLogIn className="text-5xl text-blue-500" />
            <h1 className='text-2xl font-bold mb-4'>Login</h1>
            <form
                className="flex flex-col gap-4 w-full mt-4"
                id="loginForm"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                {[
                    { placeholder: "Tu correo electronico", name: "email", disabled: false },
                    { placeholder: "Tu contraseña", name: "password", disabled: false },
                ].map((field, index) => (
                    <CustomInput
                        key={index}
                        Itype={field.name}
                        Iname={field.name}
                        Ivalue={formData[field.name]}
                        IonChange={handleInputChange}
                        Iplaceholder={field.placeholder}
                        Idisabled={field.disabled}
                    />
                ))}
                <button
                    className={`mt-4 p-2 rounded-lg font-bold  transition-all duration-300
                        ${(disableButton || isLoading) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:scale-x-102'}
                    `}
                    type="submit"
                    form='loginForm'
                    disabled={disableButton || isLoading}
                >
                    {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                </button>
            </form>
        </div>
    )
}

export default LoginForm
