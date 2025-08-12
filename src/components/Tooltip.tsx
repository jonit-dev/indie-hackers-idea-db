import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className={`cursor-help ${className}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children || <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-300" />}
      </div>
      {isVisible && (
        <div className="absolute z-50 px-3 py-2 text-sm text-white bg-slate-900 border border-slate-600 rounded-lg shadow-lg -top-2 left-full ml-2 w-64">
          <div className="absolute -left-1 top-3 w-2 h-2 bg-slate-900 border-l border-b border-slate-600 transform rotate-45"></div>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;