import React, { useState, useRef } from 'react'
import { FaUpload } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";

import { useAppContext } from '@contexts/AppProvider';
import { useAuthContext } from '@contexts/AuthProvider';

import CustomInput from '@components/CustomInput';
import Modal from '@ui/Modal';

const UploadAvatarModal = ({
    isOpen,
    onClose,
    isDark
}) => {
    const { handleNotificacion } = useAppContext();
    const { user, uploadAvatar, loading } = useAuthContext();
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInput = useRef(null);

    const handleClose = async () => {
        setTimeout(() => {
            onClose();
        }, 200);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setAvatar(null); // Restablece el estado del archivo al seleccionar uno nuevo
        setPreview(null); // Restablece la vista previa al seleccionar uno nuevo
        setAvatar(selectedFile);
        if (selectedFile) {
            // Validar si la imagen es cuadrada
            const img = new Image();
            img.src = URL.createObjectURL(selectedFile);
            img.onload = () => {
                if (img.width !== img.height) {
                    handleNotificacion('error', 'La imagen debe ser cuadrada', 5000);
                    setAvatar(null); // Restablece el estado del archivo si no es cuadrada
                    setPreview(null); // Restablece la vista previa si no es cuadrada
                    fileInput.current.value = null; // Limpia el input de archivo
                    return;
                }
                // Si la imagen es cuadrada, se establece la vista previa
                else {
                    setPreview(URL.createObjectURL(selectedFile)); // Crea una URL de objeto para la vista previa
                    setTimeout(() => {
                        URL.revokeObjectURL(img.src); // Libera la URL del objeto después de usarla
                    }, 1000);
                }
            };
            img.onerror = () => {
                handleNotificacion('error', 'Error al cargar la imagen', 5000); // Maneja el error de carga de la imagen
                setAvatar(null); // Restablece el estado del archivo si hay un error
            }
        } else {
            setPreview(null); // Si no hay archivo, restablece la vista previa
            setAvatar(null); // Si no hay archivo, restablece el estado del archivo
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        if (!avatar) return; // Si no hay archivo, no hacemos nada

        const confirm = window.confirm(`¿Subir avatar "${avatar.name}"?`);
        if (!confirm) return; // Si el usuario cancela, no hacemos nada

        const formData = new FormData();
        formData.append('file', avatar); // Agrega el archivo al FormData
        formData.append('user_id', user.id); // Agrega el ID del usuario al FormData

        await uploadAvatar(formData); // Llama a la función para subir el avatar
        setAvatar(null); // Restablece el estado del archivo
        setPreview(null); // Restablece la vista previa
        setTimeout(() => {
            onClose(); // Cierra el modal después de subir el avatar
        }, 200);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isDark={isDark}>
            <h2 className="text-xl md:text-2xl text-center font-bold w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                Cambiar avatar
            </h2>
            <form className="mt-4 w-full flex flex-col gap-4" onSubmit={handleSubmit} id="uploadAvatarForm">
                <CustomInput
                    Itype="file"
                    Iname="avatar"
                    Iplaceholder="Selecciona una imagen"
                    Irequired
                    IonChange={handleFileChange}
                    Iaccept="image/*"
                    Idisabled={loading}
                    Iref={fileInput}
                />
            </form>
            <p className="mt-2 w-full text-sm text-center text-gray-500 font-semibold">
                Selecciona una imagen para tu avatar (la imagen debe ser cuadrada)
            </p>
            <div className="mt-4 w-full flex justify-center items-center">
                {preview ? (
                    <img
                        src={preview}
                        alt="Vista previa del avatar"
                        className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                    />
                ) : (
                    <p className="text-gray-500 font-semibold">Selecciona una imagen para obtener una vista previa del avatar</p>
                )}
            </div>
            <div className="w-full flex justify-end gap-4">
                <button
                    type="submit"
                    form="uploadAvatarForm"
                    className={`p-2 rounded-lg transition-all duration-300
                        ${(!avatar || loading) ? 'cursor-not-allowed bg-gray-300 text-gray-500' 
                            :  isDark ? 'bg-blue-600 text-white' 
                            : 'bg-blue-400 text-gray-900 hover:bg-gray-400'
                        }
                        hover:scale-95 shadow-lg hover:shadow-xl`}
                    title="Subir"
                    data-tooltip-id="uploadLabel"
                    data-tooltip-content={`${avatar ? 'Subir avatar' : 'Selecciona un archivo primero'}`}
                    disabled={!avatar || loading}
                >
                    {loading
                        ? (
                            <span className="flex items-center gap-2 font-bold">
                                <span className="animate-spin"><ImSpinner9 className="text-2xl" /></span>
                                Subiendo...
                            </span>
                        ) : (
                            <span className='flex items-center gap-2 font-bold'>
                                <FaUpload className="text-2xl" />
                                Subir avatar
                            </span>
                        )
                    }
                </button>
            </div>
        </Modal>
    )
}

export default UploadAvatarModal
