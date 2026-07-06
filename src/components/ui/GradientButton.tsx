'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
}

export default function GradientButton({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  onClick,
  href,
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantClasses = {
    primary: 'gradient-bg text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
    outline: 'bg-transparent text-white border border-blue-500/50 hover:bg-blue-500/10 hover:border-blue-500',
  };

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </Component>
    </motion.div>
  );
}
