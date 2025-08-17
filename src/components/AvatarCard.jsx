import React from 'react'

const AvatarCard = ({
    avatar,
    onClick,
    isDark,
    handleFormatDate,
    isMobile = false
}) => {
    return (
        <div className={`flex flex-col h-fit items-center border-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-400'}
            cursor-pointer transition-transform duration-200 ease-in-out
        `}>
            <div className={`flex items-center justify-center rounded-t-lg
                ${isDark ? 'bg-gray-900' : 'bg-gray-400'}
            `}>
                <img src={avatar.url} alt={avatar.name || ''} onClick={onClick} className="w-fit h-fit rounded-t-lg" />
            </div>
            <div className='flex flex-col items-center p-2'>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Detalles</h2>
                {
                    [
                        { label: 'Nombre', value: avatar.name },
                        { label: 'Subido el', value: avatar.created_at }
                    ].map((item, index) => (
                        <div key={index} className="truncate">
                            <p className={`${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                                {!isMobile && <strong>{item.label}:</strong>} {item.value}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AvatarCard
