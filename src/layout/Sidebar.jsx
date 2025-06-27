import React, { useState, useEffect } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

import { IoHomeOutline } from "react-icons/io5";
import { FaChevronLeft, FaListOl, FaQuestion } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { LuBookMarked, LuContact, LuPackageSearch } from "react-icons/lu";
import { VscGitStashApply } from 'react-icons/vsc';
import { PiUsersThreeBold } from 'react-icons/pi';
import { TbBrandBlogger } from 'react-icons/tb';
import { RiShieldUserLine } from 'react-icons/ri';
import { BsFillSendArrowUpFill } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';
import { FaMicrochip } from 'react-icons/fa';

const categories = [
    { id: 1, name: 'Dashboard', icons: <IoHomeOutline />, path: '/dashboard', subcategories: [] },
    { id: 2, name: 'Testimonials', icons: <RiShieldUserLine />, path: '/testimonials', subcategories: [] },
    { id: 3, name: 'Portfolio', icons: <CgProfile />, path: '/portfolio', subcategories: [] },
    { id: 4, name: 'Hirings', icons: <LuPackageSearch />, path: '/hirings', subcategories: [] },
    { id: 5, name: 'Apply Jobs', icons: <VscGitStashApply />, path: '/apply-jobs', subcategories: [] },
    { id: 6, name: 'Teams', icons: <PiUsersThreeBold />, path: '/teams', subcategories: [] },
    { id: 7, name: 'Faqs', icons: <FaQuestion />, path: '/faqs', subcategories: [] },
    // { id: 8, name: 'Categories', icons: <FaListOl />, path: '/categories', subcategories: [] },
    // { id: 9, name: 'Blogs', icons: <TbBrandBlogger />, path: '/blogs-list', subcategories: [] },
    { id: 8, name: 'Technology', icons: <FaMicrochip />, path: '/technology', subcategories: [] },
    {
        id: 9,
        name: 'Blogs',
        icons: <TbBrandBlogger />,
        subcategories: [
            { name: 'Blog List', path: '/blogs-list' },
            { name: 'Blog Category', path: '/category' },
            { name: 'Blog Comments', path: '/blog-comments' },
        ],
    },
    { id: 10, name: 'Contact Us', icons: <LuContact />, path: '/contact-us', subcategories: [] },
    { id: 11, name: 'Newsletters', icons: <BsFillSendArrowUpFill />, path: '/newsletters', subcategories: [] },
    { id: 12, name: 'Case Studies', icons: <LuBookMarked />, path: '/case-studies', subcategories: [] },
];

function Sidebar({ className, onToggleSidebar }) {
    const [activeCategory, setActiveCategory] = useState(1);
    const location = useLocation();

    useEffect(() => {
        // Check if the current pathname matches any category path or subcategory path
        const currentCategory = categories.find(cat =>
            location.pathname.startsWith(cat.path) ||
            (cat.subcategories.some(sub => location.pathname === sub.path))
        );

        if (currentCategory) {
            setActiveCategory(currentCategory.id);
            const subcategoryMatch = currentCategory.subcategories.find(sub => location.pathname === sub.path);
            const categoryName = subcategoryMatch ? subcategoryMatch.name : currentCategory.name;
            document.title = `Vasundhara | ${categoryName} `;
        }


    }, [location.pathname]);

    const handleCategoryClick = (id, hasSubcategories) => {
        if (hasSubcategories) {
            setActiveCategory(activeCategory === id ? null : id);
        }
    };

    return (
        <div className={`sidebar position-relative ${className}`}>
            <div className='d-none d-lg-flex justify-content-center px-2 py-3'>
                <img src={className ? '../images/logo/logo-sm.svg' : '../images/logo/logo.svg'} className={className ? 'logo-sm' : 'logo-xl'} alt="Logo" />
            </div>
            <div className='d-flex d-lg-none justify-content-center px-2 py-3'>
                <img src='../images/logo/logo.svg' className='logo-xl' alt="Logo sm" />
            </div>
            <div className='sidebar-toggel-sm d-lg-none'>
                <FaChevronLeft onClick={onToggleSidebar} className='sidebar-toggel cursor-pointer arrow-left' />
            </div>
            <ul className='category-list'>
                {categories.map(category => (
                    <li key={category.id}>
                        <div
                            className={`category-header ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(category.id, category.subcategories.length > 0)}
                        >
                            <Link to={category.path} className="category-link d-flex align-items-center gap-2">
                                <span className='side-icons'>{category.icons}</span>
                                <span className='mune-items'>
                                    {category.name}
                                </span>
                            </Link>
                            {category.subcategories.length > 0 && (
                                activeCategory === category.id ? (
                                    <MdExpandLess className="icon" />
                                ) : (
                                    <MdExpandMore className="icon" />
                                )
                            )}
                        </div>
                        {activeCategory === category.id && category.subcategories.length > 0 && (
                            <ul className="subcategory-list">
                                {category.subcategories.map((subcategory, index) => {
                                    const isActive = location.pathname === subcategory.path;
                                    return (
                                        <li key={index} className={isActive ? 'active' : ''}>
                                            <Link to={subcategory.path}>{subcategory.name}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
