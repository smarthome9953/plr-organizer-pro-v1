import React from 'react';
import { Link } from 'react-router-dom';
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}
export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true
}) => {
  // Set image dimensions based on size prop
  const dimensions = {
    sm: {
      height: 30
    },
    md: {
      height: 40
    },
    lg: {
      height: 50
    }
  };
  return <Link to="/" className="flex items-center gap-2 no-underline">
      <img src="/lovable-uploads/782e9676-c3d6-42e9-b3bf-d0752540e358.png" alt="PLR Organizer Pro Logo" style={dimensions[size]} className="object-contain" />
      {showText}
    </Link>;
};
export default Logo;