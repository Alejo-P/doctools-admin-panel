// @ts-check
import React, { useState, useRef } from 'react'
import { FaUpload } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import { PiEmptyBold } from "react-icons/pi";
import { FaArrowRight, FaTrash } from "react-icons/fa";

import { useAppContext } from '@contexts/AppProvider';
import { useAdminContext } from '@contexts/AdminProvider';

import { ImageInfo } from '@constants/vars';
import CustomInput from '@components/CustomInput';
import Modal from '@ui/Modal';

const UploadAvatarModal = ({
    isOpen,
    userInfo,
    onClose,
    isDark
}) => {
    const { handleNotificacion } = useAppContext();
    const { uploadAvatar, deleteAvatar } = useAdminContext();
    const [uploadLoading, setUploadLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [currentAvatar] = useState(userInfo?.avatar?.url || null);
    const [preview, setPreview] = useState(null);
    const fileInput = useRef(null);

    const handleClose = async () => {
        setTimeout(() => {
            onClose();
        }, 200);
    }

    const clearInput = () => {
        setAvatar(null); // Restablece el estado del archivo si es demasiado grande
        setPreview(null); // Restablece la vista previa si es demasiado grande
        fileInput.current.value = null; // Limpia el input de archivo
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setAvatar(null); // Restablece el estado del archivo al seleccionar uno nuevo
        setPreview(null); // Restablece la vista previa al seleccionar uno nuevo
        setAvatar(selectedFile);
        if (selectedFile) {
            // Validar si la imagen es cuadrada
            const img = new Image();
            const objectURL = URL.createObjectURL(selectedFile);
            img.src = objectURL;
            img.onload = () => {
                if (img.width !== img.height) {
                    handleNotificacion('error', 'La imagen debe ser cuadrada', 5000);
                    setAvatar(null); // Restablece el estado del archivo si no es cuadrada
                    setPreview(null); // Restablece la vista previa si no es cuadrada
                    fileInput.current.value = null; // Limpia el input de archivo
                    return;
                }
                
                if (img.width < ImageInfo.MIN_WIDTH || img.height < ImageInfo.MIN_HEIGHT) {
                    handleNotificacion('error', `La imagen es demasiado pequeña. Mínimo ${ImageInfo.MIN_WIDTH}px x ${ImageInfo.MIN_HEIGHT}px`, 5000);
                    clearInput();
                    return;
                }

                if (img.width > ImageInfo.MAX_WIDTH || img.height > ImageInfo.MAX_HEIGHT) {
                    handleNotificacion('error', `La imagen es demasiado grande. Máximo ${ImageInfo.MAX_WIDTH}px x ${ImageInfo.MAX_HEIGHT}px`, 5000);
                    clearInput();
                    return;
                }

                // Si la imagen es cuadrada, se establece la vista previa
                setPreview(objectURL); // Crea una URL de objeto para la vista previa
                setTimeout(() => {
                    URL.revokeObjectURL(objectURL); // Libera la URL del objeto después de usarla
                }, 1000);
            };
            img.onerror = (e) => {
                console.error('Error al cargar la imagen', e);
                handleNotificacion('error', 'Error al cargar la imagen', 5000); // Maneja el error de carga de la imagen
                clearInput();
            }
        } else {
            setPreview(null); // Si no hay archivo, restablece la vista previa
            setAvatar(null); // Si no hay archivo, restablece el estado del archivo
        }
    };

    const handleDelete = async () => {
        const confirm = window.confirm(`¿Eliminar avatar?`);
        if (!confirm) return;

        const formData = new FormData();
        formData.append('user_id', userInfo.id); // Agrega el ID del usuario al FormData
        setDeleteLoading(true);
        await deleteAvatar(formData);
        setDeleteLoading(false);
        clearInput(); // Limpia el input y la vista previa
        setTimeout(() => {
            onClose(); // Cierra el modal después de eliminar el avatar
        }, 200);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        if (!avatar) return; // Si no hay archivo, no hacemos nada

        const confirm = window.confirm(`¿Subir avatar "${avatar.name}"?`);
        if (!confirm) return; // Si el usuario cancela, no hacemos nada

        const formData = new FormData();
        formData.append('file', avatar); // Agrega el archivo al FormData
        formData.append('user_id', userInfo.id); // Agrega el ID del usuario al FormData
        setUploadLoading(true);
        await uploadAvatar(formData); // Llama a la función para subir el avatar
        setUploadLoading(false);
        clearInput(); // Limpia el input y la vista previa
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
                    Imessage='*La imagen debe ser cuadrada'
                    Irequired
                    IonChange={handleFileChange}
                    Iaccept="image/*"
                    Idisabled={uploadLoading || deleteLoading}
                    Iref={fileInput}
                />
            </form>
            <div className="mt-4 w-full flex gap-2 justify-center items-center">
                <div className="flex flex-col items-center mr-4 gap-2">
                    <p className="text-gray-500 font-semibold">Avatar actual:</p>
                    {currentAvatar ? (
                        <img
                            src={currentAvatar}
                            alt="Avatar actual"
                            className="w-22 h-22 rounded-full object-cover border-2 border-gray-300"
                        />
                    ): (
                        <div className="w-22 h-22 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <PiEmptyBold className="text-4xl text-gray-400" />
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center mx-4 gap-2">
                    <p className="text-gray-500 font-semibold p-3"/>
                    <FaArrowRight className={`text-2xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
                </div>
                <div className="flex flex-col items-center ml-4 gap-2">
                    <p className="text-gray-500 font-semibold">Vista previa:</p>
                    {preview ? (
                        <img
                            src={preview}
                            alt="Vista previa del avatar"
                            className="w-22 h-22 rounded-full object-cover border-2 border-gray-300"
                        />
                    ) : (
                        <div className="w-22 h-22 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <PiEmptyBold className="text-4xl text-gray-400" />
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full flex justify-end gap-4">
                <button
                    type="submit"
                    form="uploadAvatarForm"
                    className={`p-2 rounded-lg transition-all duration-300
                        ${(!avatar || uploadLoading) ? 'cursor-not-allowed bg-gray-300 text-gray-500' 
                            :  isDark ? 'bg-blue-600 text-white' 
                            : 'bg-blue-400 text-gray-900 hover:bg-gray-400'
                        }
                        hover:scale-95 shadow-lg hover:shadow-xl`}
                    title="Subir"
                    data-tooltip-id="uploadLabel"
                    data-tooltip-content={`${avatar ? 'Subir avatar' : 'Selecciona un archivo primero'}`}
                    disabled={!avatar || uploadLoading}
                >
                    {uploadLoading
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
                {currentAvatar && (
                    <button
                        type="button"
                        className={`p-2 rounded-lg transition-all duration-300
                            ${deleteLoading ? 'cursor-not-allowed bg-gray-300 text-gray-500' 
                                :  isDark ? 'bg-red-600 text-white' 
                                : 'bg-red-400 text-gray-900 hover:bg-gray-400'
                            }
                            hover:scale-95 shadow-lg hover:shadow-xl`}
                        title="Eliminar"
                        onClick={handleDelete}
                        disabled={deleteLoading}
                    >
                        {deleteLoading
                            ? (
                                <span className="flex items-center gap-2 font-bold">
                                    <span className="animate-spin"><ImSpinner9 className="text-2xl" /></span>
                                    Eliminando...
                                </span>
                            ) : (
                                <span className='flex items-center gap-2 font-bold'>
                                    <FaTrash className="text-2xl" />
                                    Eliminar avatar
                                </span>
                            )
                        }
                    </button>
                )}
            </div>
        </Modal>
    )
}

export default UploadAvatarModal
