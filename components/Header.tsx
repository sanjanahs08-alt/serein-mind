import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="px-6 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-100 flex justify-between items-center">
      <h1 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h1>
      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
        <span className="text-teal-700 text-sm font-semibold">S</span>
      </div>
    </header>
  );
};