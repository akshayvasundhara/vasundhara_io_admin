import React, { useState } from 'react';
import Sidebar from './Sidebar';  // Ensure you have this component
import SideTopBard from './SideTopBard';

function Layout({ children }) {
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(prevState => !prevState);
    };

    return (
        <div className='d-flex w-100'>
            <div className='d-flex w-100 bg-light-dark'>
                <Sidebar className={isSidebarVisible ? '' : 'sidebar-sm'} />
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
