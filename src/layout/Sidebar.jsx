import React, { useState, useEffect } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom'; // Import for routing
import { IoHomeSharp } from "react-icons/io5";

const categories = [
    { id: 1, name: 'Dashboard', icons: <IoHomeSharp />, path: '/dashboard', subcategories: [] }, // Add 'path' for links
    { id: 2, name: 'Testimonials', path: '/testimonials', subcategories: [] },
    { id: 3, name: 'Home 3', path: '/home3', subcategories: [] },
    { id: 4, name: 'Home 4', path: '/home4', subcategories: [] },
    // { id: 5, name: 'Category 1', path: 'category1', subcategories: ['Subcategory 2.1', 'Subcategory 2.2'] },
];

function Sidebar({ className }) {
    const [activeCategory, setActiveCategory] = useState(1); // Set default active category to Dashboard
    const location = useLocation(); // Get current location

    useEffect(() => {
        // Update activeCategory based on the current route
        const currentCategory = categories.find(cat => location.pathname.startsWith(cat.path));
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
                            className={`category-header ${activeCategory === category.id ? 'active' : ''}`} // Apply active class based on state
                            onClick={() => handleCategoryClick(category.id, category.subcategories.length > 0)}
                        >
                            <span className='side-icons'>
                                {category.icons}
                            </span>
                            <Link to={category.path} className="category-link"> {/* Make category names clickable */}
                                {category.name}
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
                                {category.subcategories.map((subcategory, index) => (
                                    <li key={index}>{subcategory}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
