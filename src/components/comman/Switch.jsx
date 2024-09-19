import React, { useState } from 'react'

function Switch() {
    // State to track the dark mode status
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to handle the toggle switch
    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    };
    return (
        <>
            <div className={`cont d-flex justify-content-start align-items-center ${isDarkMode ? 'dark-mode' : ''}`}>
                <div className="toggle">
                    <input
                        type="checkbox"
                        id="mode-toggle"
                        className="toggle__input"
                        checked={isDarkMode}
                        onChange={handleToggle}
                    />
                    <label htmlFor="mode-toggle" className="toggle__label"></label>
                </div>
            </div>
        </>
    )
}

export default Switch
