import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';  // Ensure you have this component
import SideTopBard from './SideTopBard';

function Layout({ children }) {
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(prevState => !prevState);
    };

    const handleResize = () => {
        // Check window width and set sidebar visibility accordingly
        if (window.innerWidth <= 991) {
            setSidebarVisible(false); // Hide sidebar on small screens
        } else {
            setSidebarVisible(true); // Show sidebar on larger screens
        }
    };

    useEffect(() => {
        // Set initial sidebar state based on current window size
        handleResize();

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Clean up event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='d-flex w-100'>
            <div className='d-flex w-100 bg-light-dark position-relative'>
                <Sidebar onToggleSidebar={toggleSidebar} className={isSidebarVisible ? '' : 'sidebar-sm'} />
                <div className='w-100'>
                    <div className='border-bottom'>
                        <SideTopBard onToggleSidebar={toggleSidebar} />
                    </div>
                    <div className='page-main p-4 pt-3 overflow-auto vh-100 rem-5'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
