import { Dropdown } from 'bootstrap';
import React from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';
import { logout } from '../helper/auth';
import { useNavigate } from 'react-router-dom';

function SideTopBard({ onToggleSidebar }) {

    const navigate = useNavigate();
    const handleLogOut = () => {
        logout();
        navigate('/login');
    }
    return (
        <div className='side-top-bar d-flex justify-content-between align-items-center gap-3'>
            <div>
                <FaBarsStaggered onClick={onToggleSidebar} className='sidebar-toggel' />
            </div>
            <div className="dropdown user-dropdown">
                <button className="border-0 bg-transparent" type="button" aria-expanded="false" data-bs-toggle="dropdown">
                    <div className='d-flex align-items-center gap-2 user-image'>
                        <div className='user-box'>
                            <img className='w-100 h-100' src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" alt="" />
                        </div>
                        <div className='lh-sm'>
                            <p className='user-title'>Admin</p>
                        </div>
                        <div className='dropdown-toggle'></div>
                    </div>

                </button>
                <ul className="dropdown-menu mt-2">
                    <li><a className="dropdown-item" onClick={handleLogOut}>Logout</a></li>
                </ul>
            </div>
        </div>
    );
}

export default SideTopBard;
