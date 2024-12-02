import React, { useState, useEffect, useRef } from 'react';

const EditableField = ({ value, onSave, inputType = 'text' }) => {
  const [editValue, setEditValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSave = () => {
    if (editValue !== value) {
      onSave(editValue); // Save the new value
    }
    setIsEditing(false); // Exit edit mode
  };

  const handleCancel = () => {
    setEditValue(value); // Reset to original value
    setIsEditing(false); // Exit edit mode
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave(); // Save the edit on Enter key
    } else if (e.key === 'Escape') {
      handleCancel(); // Cancel edit on Escape key
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus(); // Focus the input when editing starts
    }
  }, [isEditing]);

  return (
    <div onClick={handleEditClick} style={{ cursor: 'pointer' }}>
      {!isEditing ? (
        <span>{value}</span> // Display value normally
      ) : (
        <input
          ref={inputRef}
          type={inputType}
          value={editValue}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          onBlur={handleSave} // Optional: Save on blur
          style={{ 
            fontSize: 'inherit', 
            border: '1px solid #ccc', 
            padding: '4px', 
            borderRadius: '4px' 
          }}
        />
      )}
    </div>
  );
};

export default EditableField;
