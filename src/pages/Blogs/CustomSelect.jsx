import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

const CustomSelect = ({
  options, 
  value,   
  onChange,
  placeholder = 'Select services and Sub-service'
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleOption = (rawId) => {
    let newValue;
    if (value.includes(rawId)) {
      newValue = value.filter(id => id !== rawId);
    } else {
      newValue = [...value, rawId];
    }
    onChange(newValue);
  };

  const selectedOptions = options.flatMap(group => group.options)
    .filter(opt => value.includes(opt.rawId));

  return (
    <div className="custom-select-admin" ref={ref}>
      <div className="selected-tags-admin" onClick={() => setOpen(!open)}>
        {selectedOptions.map(opt => (
          <span className="tag-admin" key={opt.rawId}>
            {opt.label}
            <span
              className="tag-remove-admin"
              onClick={e => {
                e.stopPropagation();
                toggleOption(opt.rawId);
              }}
              title="Remove"
            >
              &times;
            </span>
          </span>
        ))}
        <input
          className="select-input-admin"
          placeholder={selectedOptions.length ? '' : placeholder}
          readOnly
        />
        <span className="dropdown-arrow-admin">&#9662;</span>
      </div>
      {open && (
        <div className="dropdown-panel-admin">
          {options.map((group, i) => (
            <div key={i}>
              {group.options.map(opt => (
                <div
                  key={opt.rawId}
                  className={`dropdown-option-admin${opt.isSubservice ? ' subservice-admin' : ''}${value.includes(opt.rawId) ? ' selected-admin' : ''}`}
                  onClick={() => toggleOption(opt.rawId)}
                >
                  {opt.label}
                  {value.includes(opt.rawId) && <span className="tick-admin">&#10003;</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect; 