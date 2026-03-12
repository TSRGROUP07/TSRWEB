import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

const ResponsiveContainer: React.FC<Props> = ({ children, className = '' }) => {
    return (
        <div className={`px-4 py-6 md:px-8 md:py-12 lg:px-12 lg:py-16 max-w-7xl mx-auto ${className}`}>
            {children}
        </div>
    );
};

export default ResponsiveContainer;
