import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import clsx from 'clsx';

const SideBarItem = ({ icon: Icon, label, to = '', isDark, onClick, isSelected, isMobile = false }) => {
    const [isOpenTooltip, setIsOpenTooltip] = useState(false);
    const handleClick = () => {
        onClick(to);
    };

    const baseClasses =
        "flex flex-1 p-2 transition-all duration-300 w-10 hover:w-40 justify-center group";

    const textClasses = clsx(
        {
            "text-blue-400 border-b-2 border-blue-400": isSelected,
            "text-white cursor-pointer": isDark && !isSelected,
            "text-gray-900 cursor-pointer": !isDark && !isSelected,
        }
    );

    return (
        <>
            <motion.div
                className={clsx(baseClasses, textClasses)}
                title={label}
                data-tooltip-id={`sidebar-item-tooltip-${label}`}
                data-tooltip-content={label}
                onClick={handleClick}
                onMouseEnter={() => setIsOpenTooltip(true)}
                onMouseLeave={() => setIsOpenTooltip(false)}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <Icon className="w-5 h-5" />
                {!isMobile && (
                    <motion.span
                        className={`hidden group-hover:block ml-2 whitespace-nowrap overflow-hidden text-ellipsis
              ${isSelected ? 'text-blue-400 sm:block' : ''}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {label}
                    </motion.span>
                )}
            </motion.div>

            {isMobile && (
                <ReactTooltip
                    id={`sidebar-item-tooltip-${label}`}
                    place="bottom"
                    variant={isDark ? "dark" : "light"}
                    delayShow={100}
                    isOpen={isOpenTooltip}
                />
            )}
        </>
    );
};

export default SideBarItem;
