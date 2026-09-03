import React from 'react';

export const StatusBar: React.FC<{ isDarkText?: boolean }> = ({ isDarkText = true }) => {
  return (
    <div className={`h-6 px-4 flex items-center justify-between select-none ${isDarkText ? 'text-on-surface' : 'text-white'}`}>
      <span className="font-label-sm text-[12px] font-bold tracking-tight">09:41</span>
      <div className="flex items-center gap-1.5">
        <span className="material-symbols-outlined text-[15px]">signal_cellular_alt</span>
        <span className="material-symbols-outlined text-[15px]">wifi</span>
        <span className="material-symbols-outlined text-[15px]">battery_full</span>
      </div>
    </div>
  );
};
