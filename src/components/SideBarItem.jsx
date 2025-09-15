import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import clsx from 'clsx';

const SideBarItem = ({ icon: Icon, label, to = '', isDark, onClick, isSelected, isMobile = false }) => {
    const [isOpenTooltip, setIsOpenTooltip] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const handleClick = () => {
        onClick(to);
    };

    const afterShow = () => {
        setTimeout(() => {
            setIsOpenTooltip(false);
        }, 5000);
    };

    const baseClasses =
        "flex flex-1 p-2 transition-all duration-300 w-10 hover:w-40 justify-center group";

    const textClasses = clsx(
        {
            "text-blue-400 border-b-2 border-blue-400 font-bold": isSelected,
            "text-white cursor-pointer": isDark && !isSelected,
            "text-gray-900 cursor-pointer": !isDark && !isSelected,
        }
    );

    return (
        <AnimatePresence>
            <motion.div
                className={clsx(baseClasses, textClasses)}
                title={label}
                data-tooltip-id={`sidebar-item-tooltip-${label}`}
                data-tooltip-content={label}
                onClick={handleClick}
                onMouseEnter={() => setIsOpenTooltip(true)}
                onMouseLeave={() => setIsOpenTooltip(false)}
                initial={{ width: isSelected ? 160 : 40 }}
                animate={{ width: isHovered || isSelected ? 160 : 40 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                key={label}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <AnimatePresence>
                    <motion.div
                        className="flex justify-center items-center"
                        initial={{ scale: 1 }}
                        animate={{ scale: isHovered || isSelected ? 1.2 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        key={label + "icon"}
                        layout
                    >
                        <Icon className="w-5 h-5" />
                    </motion.div>
                    {(!isMobile && (isHovered || isSelected)) && (
                        <motion.span
                            className={`group-hover:block ml-2 whitespace-nowrap overflow-hidden text-ellipsis ${isSelected ? 'text-blue-400' : ''}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            key={label}
                            layout
                        >
                            {label}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>

            {isMobile && (
                <ReactTooltip
                    id={`sidebar-item-tooltip-${label}`}
                    place="bottom"
                    variant={isDark ? "dark" : "light"}
                    delayShow={100}
                    isOpen={isOpenTooltip}
                    afterShow={afterShow}
                />
            )}
        </AnimatePresence>
    );
};

export default SideBarItem;
