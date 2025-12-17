import React from 'react';

export const BreathingLoader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-fade-in bg-slate-50/50 backdrop-blur-sm z-50">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 bg-teal-200 rounded-full opacity-30 animate-breathe blur-xl"></div>
        <div className="absolute w-24 h-24 bg-teal-300 rounded-full opacity-40 animate-breathe animation-delay-500 blur-lg"></div>
        <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center z-10 animate-pulse">
           <span className="text-2xl">🌿</span>
        </div>
      </div>
      <p className="text-slate-600 font-medium tracking-wide animate-pulse">{text}</p>
    </div>
  );
};