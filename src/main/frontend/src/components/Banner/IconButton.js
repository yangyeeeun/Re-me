import React from 'react';

const IconButton = ({ icon: Icon, onClick, hasDot, className }) => (
  <div className={`icon-button ${className}`} onClick={onClick}>
    <Icon />
    {hasDot && <span className="new-message-dot"></span>}
  </div>
);

export default IconButton;