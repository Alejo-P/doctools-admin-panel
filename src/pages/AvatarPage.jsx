import React, { useEffect } from 'react'

import { useAppContext } from '@contexts/AppProvider'
import { useAdminContext } from '@contexts/AdminProvider'
import AvatarCard from '@components/AvatarCard'
import LoadingCard from '@components/LoadingCard'

const AvatarPage = () => {
    const { isDark, isMobile, formatDate } = useAppContext()
    const { avatarList, getAvatarList, loading } = useAdminContext()

    useEffect(() => {
        if (!avatarList.length) {
            getAvatarList()
        }
    }, [])

    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full h-full gap-2'>
            {loading ? (
                <LoadingCard />
            ) : (
                avatarList.map(avatar => (
                    <AvatarCard
                        key={avatar.id}
                        avatar={avatar}
                        isDark={isDark}
                        handleFormatDate={formatDate}
                        isMobile={isMobile}
                    />
                ))
            )}
        </div>
    )
}

export default AvatarPage
