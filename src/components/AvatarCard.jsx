// AvatarCard.js
import React from "react"
import clsx from "clsx"

const AvatarCard = ({ avatar, isDark, isMobile = false, onClick }) => {
  const textColor = isDark ? "text-gray-100" : "text-gray-900"
  const borderColor = isDark ? "border-gray-500" : "border-gray-300"
  const bgColor = isDark ? "bg-gray-700" : "bg-white"

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={clsx(
        "flex flex-col items-center rounded-lg shadow-md border transition-all duration-200",
        "hover:scale-[1.02] hover:shadow-lg cursor-pointer",
        bgColor,
        borderColor,
        "p-4 max-w-sm mx-auto w-full text-center",
      )}
    >
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 mb-4">
        <img
          src={avatar.url}
          alt={avatar.name ? `Avatar de ${avatar.name}` : "Avatar"}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="text-center w-full">
        <h2 className={clsx("font-semibold mb-1", isMobile ? "text-base" : "text-lg", textColor)}>
          {avatar.name}
        </h2>
        <p className={clsx("text-sm truncate", textColor)}>
          <strong>Subido el:</strong> {avatar.formattedDate}
        </p>
        <p className={clsx("text-sm truncate", textColor)}>
            <strong>Dimensiones:</strong> {avatar.width}px × {avatar.height}px
        </p>
      </div>
    </div>
  )
}

export default AvatarCard
