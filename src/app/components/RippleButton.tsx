import React, { useState } from 'react';

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

export function RippleButton({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  ...props 
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples([...ripples, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(ripples => ripples.filter(r => r.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick(e);
    }
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#FF9933] to-[#FF7700] text-white hover:from-[#FF7700] hover:to-[#FF5500]',
    secondary: 'bg-gradient-to-r from-[#138808] to-[#0d6006] text-white hover:from-[#0d6006] hover:to-[#0a4804]',
    outline: 'border-2 border-[#FF9933] text-[#FF9933] bg-white hover:bg-[#FFF8DC]',
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden rounded-full px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-xl ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white opacity-50 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animation: 'ripple 600ms ease-out',
          }}
        />
      ))}
      <style>{`
        @keyframes ripple {
          from {
            transform: scale(0);
            opacity: 0.5;
          }
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}
