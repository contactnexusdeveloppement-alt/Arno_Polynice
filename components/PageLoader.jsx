'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageLoader() {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, [pathname]);

    if (!loading) return null;

    return (
        <div className="page-loader">
            <div className="page-loader-spinner">
                <svg viewBox="0 0 50 50" className="page-loader-svg">
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth="2"
                    />
                </svg>
                <span className="page-loader-logo">AP</span>
            </div>
        </div>
    );
}
