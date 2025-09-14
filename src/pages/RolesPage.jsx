import React, { useState, useEffect } from 'react'
import { LuMousePointerClick } from "react-icons/lu";

import { useAdminContext } from '@contexts/AdminProvider';
import { useAppContext } from '@contexts/AppProvider';
import LoadingCard from '@components/LoadingCard';

const RolesPage = () => {
    const { isDark, isMobile, setShowActions, setActionItems } = useAppContext();
    
    return (
        <div>
            <h1>Roles</h1>
            <p>Gestiona los roles de los usuarios en esta sección.</p>
        </div>
    )
}

export default RolesPage
