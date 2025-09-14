import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { MdArrowBackIosNew } from "react-icons/md";

const ActionsCard = ({
    isDark,
    actionItems = [],
    showActions
}) => {
    const [tooltips, setTooltips] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef(null);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    }
    
    useEffect(() => {
        const tooltipsElements = actionItems.map(({ key, element }) => {
            const tooltip = element.props['data-tooltip-id'];
            return tooltip ? { key, tooltip } : null;
        });
        setTooltips(tooltipsElements.filter(Boolean));
    }, [actionItems]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        }

        if (isExpanded) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isExpanded]);

    return (
        <AnimatePresence onExitComplete={() => setIsExpanded(false)}>
            {(showActions && actionItems.length > 0) && (
                <motion.div
                    ref={containerRef}
                    layout
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 40, opacity: 0, scale: 0.9 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 120, 
                        damping: 15,
                        duration: 0.4
                    }}
                    className={`fixed bottom-6 right-6 flex flex-col gap-3 rounded-lg transition-all duration-300 border
                        ${isDark ? 'bg-gray-800 text-white shadow-lg border-gray-500' : 'bg-white text-gray-900 shadow-xl border-gray-300'}`}
                    >
                    <div
                        className={`flex flex-row gap-3 p-3 rounded-lg transition-all duration-300`}>
                        <AnimatePresence>
                            <motion.button
                                key="collapse-button"
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25, delay: isExpanded ? 0.25 : 0 }}
                                className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300`}
                                whileHover={{ transition: { duration: 0.2 }, scale: 1.1 }}
                                whileTap={{ transition: { duration: 0.1 }, scale: 0.9 }}
                                title={`${isExpanded ? 'Colapsar' : 'Expandir'}`}
                                data-tooltip-id="expandActionsLabel"
                                data-tooltip-content={`${isExpanded ? 'Colapsar' : 'Expandir'}`}
                                onClick={handleExpand}
                            >
                                <motion.span
                                    className="text-3xl"
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <MdArrowBackIosNew className="text-2xl" />
                                </motion.span>
                            </motion.button>
                            {isExpanded && actionItems.map(({ key, element }) => (
                                <motion.div
                                    key={key}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {element}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    {tooltips.map(({ key, tooltip }) => (
                        <ReactTooltip
                            key={key}
                            id={tooltip}
                            place="top"
                            effect="solid"
                            className={`text-xs font-semibold ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                        />
                    ))}
                    <ReactTooltip id="expandActionsLabel" place="top" delayShow={100}/>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ActionsCard
