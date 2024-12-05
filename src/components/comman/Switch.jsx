
import React, { useEffect, useState } from 'react'

function Switch({ mode, index, onToggle, itemId,data="" }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentMode, setCurrentMode] = useState(mode);

    useEffect(() => {
        setCurrentMode(mode)
    }, [mode])


    // Function to handle the toggle switch
    const handleToggle = () => {
        const newMode = currentMode === 0 ? 1 : 0;
        setCurrentMode(newMode);
        if (onToggle) {
            onToggle(itemId, newMode,{[data]:newMode}); // Call onToggle with item ID and new status
        }
    };
    return (
        <>
            <div className={`cont d-flex justify-content-start align-items-center ${currentMode === 0 ? 'dark-mode' : 'toggle01'}`}>
                <div className="toggle">
                    <input
                        type="checkbox"
                        id={`mode-toggle-${index+data}`}
                        className="toggle__input"
                        checked={currentMode === 1}
                        onChange={handleToggle}
                    />
                    <label htmlFor={`mode-toggle-${index+data}`} className="toggle__label"></label>
                </div>
            </div>
        </>
    )
}

export default Switch
