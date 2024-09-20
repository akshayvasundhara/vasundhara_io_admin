import React, { useEffect, useState } from 'react'

function Switch({ mode }) {
    // State to track the dark mode status
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentMode, setCurrentMode] = useState(mode);

    useEffect(() => {
        setCurrentMode(mode)
    }, [mode])


    // Function to handle the toggle switch
    const handleToggle = () => {
        const newMode = currentMode === 0 ? 1 : 0; // Toggle between 0 and 1
        setCurrentMode(newMode);
    };
    return (
        <>
            <div className={`cont d-flex justify-content-start align-items-center ${currentMode === 0 ? 'dark-mode' : ''}`}>
                <div className="toggle">
                    <input
                        type="checkbox"
                        id="mode-toggle"
                        className="toggle__input"
                        checked={currentMode === 1}
                        onChange={handleToggle}
                    />
                    <label htmlFor="mode-toggle" className="toggle__label"></label>
                </div>
            </div>
        </>
    )
}

export default Switch
