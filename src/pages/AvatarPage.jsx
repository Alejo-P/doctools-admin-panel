import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdOutlineRefresh } from "react-icons/md";
import { useAppContext } from '@contexts/AppProvider'
import { useAdminContext } from '@contexts/AdminProvider'
import AvatarCard from '@components/AvatarCard'
import LoadingCard from '@components/LoadingCard'

const AvatarPage = () => {
    const { isDark, isMobile, formatDate, setShowActions, setActionItems } = useAppContext();
    const { avatarList, getAvatarList, loading } = useAdminContext();
    const navigate = useNavigate();

    const handleFetchAvatars = async () => {
        setShowActions(false);
        await getAvatarList();
        setShowActions(true);
    }

    const handleClickAvatar = (id) => {
        navigate(`/dashboard/avatars/${id}`);
    }

    useEffect(() => {
        const actions = [
            {
                key: 'Cargar Avatar',
                element: (
                    <button
                    onClick={() => setShowCreateUserModal(true)}
                    className={`p-2 rounded-lg transition-all duration-300
                        ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'} 
                        hover:scale-95 shadow-lg hover:shadow-xl`}
                        title="Cargar Avatar"
                        data-tooltip-id="addAvatarLabel"
                        data-tooltip-content="Cargar nuevo avatar"
                        >
                        <span className="text-3xl">
                            <MdAddPhotoAlternate className='text-2xl'/>
                        </span>
                    </button>
                )
            },
            {
                key: 'Refrescar',
                element: (
                    <button
                    onClick={() => handleFetchAvatars()}
                    className={`p-2 rounded-lg transition-all duration-300
                        ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'} 
                        hover:scale-95 shadow-lg hover:shadow-xl`}
                        title="Refrescar lista de avatares"
                        data-tooltip-id="refreshLabel"
                        data-tooltip-content="Refrescar lista de avatares"
                        >
                        <span className="text-3xl">
                            <MdOutlineRefresh className='text-2xl'/>
                        </span>
                    </button>
                )
            }
        ]
        setActionItems(actions);
        return () => setActionItems([]);
    }, [isDark, avatarList]);

    useEffect(() => {
        if (!avatarList.length) {
            handleFetchAvatars()
        }
    }, [])

    return (
        <>
            {loading ? <LoadingCard /> : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-full gap-2 p-2'>
                    {avatarList.map(avatar => {
                        let avatarInfo = { ...avatar };
                        avatarInfo.formattedDate = formatDate(avatar.created_at);
                        return (
                            <AvatarCard
                                key={avatarInfo.id}
                                avatar={avatarInfo}
                                isDark={isDark}
                                isMobile={isMobile}
                                onClick={() => handleClickAvatar(avatarInfo.id)}
                            />
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default AvatarPage
