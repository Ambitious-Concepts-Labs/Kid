import React from 'react'

// Button component
const Button = ({ onClick, variant, children, disabled, type, size }) => (
  <button
    className={`button-class ${variant} ${size}`} // Add your button styles here
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
);

export default Button;
