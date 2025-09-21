import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";

import { useAppContext } from '@contexts/AppProvider'
import { useAdminContext } from '@contexts/AdminProvider'
import LoadingCard from '@components/LoadingCard'
import CustomInput from '@components/CustomInput'

const AvatarDetailPage = () => {
    const { id } = useParams()
    const { getAvatarById, loading } = useAdminContext()
    const { isDark, formatDate } = useAppContext()
    const [avatar, setAvatar] = useState(null)
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const fetchAvatar = async () => {
            const data = await getAvatarById(id)
            setAvatar(data)
        }

        fetchAvatar()
    }, [id])

    return (
        <>
            {loading ? (<LoadingCard />) : avatar ? (
                <div className="p-4 w-full max-w-2xl mx-auto shadow-md transition-all duration-300">
                    <h1 className="text-2xl text-center font-bold mb-4">Detalle del Avatar</h1>
                    <div className="flex flex-row items-center justify-evenly">
                        <img
                            src={avatar.url}
                            alt={avatar.name ? `Avatar de ${avatar.name}` : "Avatar"}
                            className={`w-48 h-48 rounded-xl mb-4 object-cover border-2 ${isDark ? 'border-gray-500' : 'border-gray-300'}`}
                        />
                        <div className="ml-6 flex flex-col justify-center">
                            <h2 className="text-xl font-semibold mb-2">{avatar.name}</h2>
                            <p className="mb-1"><strong>Formato de imagen:</strong> {avatar.format}</p>
                            <p className="mb-1"><strong>Dimensiones:</strong> {avatar.width}px × {avatar.height}px</p>
                            <p className="mb-1"><strong>Subido el:</strong> {formatDate(avatar.created_at)}</p>
                        </div>
                    </div>
                    <div className="ml-6 flex flex-col justify-center">
                        {Array.isArray(avatar.used_by) && avatar.used_by.length > 0 ? (
                            avatar.used_by.map((user) => (
                                <p key={user.user_id} className="mb-1"><strong>Usado por:</strong> {user.name}</p>
                            ))
                        ) : (
                            <p className="mb-1"><strong>Usado por:</strong> Ningún usuario</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>No se encontró el avatar.</p>
            )}
            <div className="fixed bottom-4 left-4">
                <button
                    onClick={handleGoBack}
                    className={`flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                    <FaArrowLeft className="mr-2" />
                    Volver
                </button>
            </div>
        </>
    )
}

export default AvatarDetailPage
