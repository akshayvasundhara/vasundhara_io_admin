import React, { useState, useEffect } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

import { IoHomeOutline } from "react-icons/io5";
import { FaListOl, FaQuestion } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { LuPackageSearch } from "react-icons/lu";
import { VscGitStashApply } from 'react-icons/vsc';
import { PiUsersThreeBold } from 'react-icons/pi';
import { TbBrandBlogger } from 'react-icons/tb';
import { RiShieldUserLine } from 'react-icons/ri';

const categories = [
    { id: 1, name: 'Dashboard', icons: <IoHomeOutline />, path: '/dashboard', subcategories: [] },
    { id: 2, name: 'Testimonials', icons: <RiShieldUserLine />, path: '/testimonials', subcategories: [] },
    { id: 3, name: 'Portfolios', icons: <CgProfile />, path: '/portfolios', subcategories: [] },
    { id: 4, name: 'Hirings', icons: <LuPackageSearch />, path: '/hirings', subcategories: [] },
    { id: 5, name: 'Apply Jobs', icons: <VscGitStashApply />, path: '/apply-jobs', subcategories: [] },
    { id: 6, name: 'Teams', icons: <PiUsersThreeBold />, path: '/teams', subcategories: [] },
    { id: 7, name: 'Faqs', icons: <FaQuestion />, path: '/faqs', subcategories: [] },
    { id: 8, name: 'Categories', icons: <FaListOl />, path: '/categories', subcategories: [] },
    {
        id: 9,
        name: 'Blogs',
        icons: <TbBrandBlogger />,
        subcategories: [
            { name: 'Blog List', path: '/blogs-list' },
            { name: 'Blog Media', path: '/blog-media' },
            { name: 'Blog Comments', path: '/blog-comments' },
        ],
    }
];

function Sidebar({ className }) {
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
        }
    }, [location.pathname]);

    const handleCategoryClick = (id, hasSubcategories) => {
        if (hasSubcategories) {
            setActiveCategory(activeCategory === id ? null : id);
        }
    };

    return (
        <div className={`sidebar ${className}`}>
            <div className='d-flex justify-content-center px-2 py-3'>
                <img src={className ? '../images/logo/logo-sm.svg' : '../images/logo/logo.svg'} className={className ? 'logo-sm' : 'logo-xl'} alt="Logo" />
            </div>
            <ul className='category-list'>
                {categories.map(category => (
                    <li key={category.id}>
                        <div
                            className={`category-header ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(category.id, category.subcategories.length > 0)}
                        >
                            <span className='side-icons'>{category.icons}</span>
                            <Link to={category.path} className="category-link">{category.name}</Link>
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
