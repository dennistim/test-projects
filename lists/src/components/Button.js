import React from 'react';
import Colors from '../constants/colors';

const backgroundColors = {
  primary: Colors.primary,
  danger: Colors.danger,
  secondary: Colors.secondary
};

const styles = {
  color: '#fff',
  border: 'none',
  padding: '5px 15px',
  margin: '0 2px',
  borderRadius: 6
};

const Button = ({children, onClick, type = 'primary', disabled = false}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      ...styles,
      backgroundColor: backgroundColors[type],
      opacity: disabled ? .7 : 1
    }}
  >
    {children}
  </button>
);

export default Button;
