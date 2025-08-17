import React, { useState, useEffect } from 'react'

import LoadingCard from '@components/LoadingCard';

const DashboardPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? <LoadingCard /> : (
                <div>
                    <h1>Dashboard</h1>
                </div>
            )}
        </>
    )
}

export default DashboardPage
