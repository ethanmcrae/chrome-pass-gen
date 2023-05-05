import React from 'react';
import { HoverTooltipProps } from '../types';

const HoverTooltip: React.FC<HoverTooltipProps> = ({ label }) => {
  return (
    <div className="top-0 absolute p-2 bg-white text-black rounded-md shadow-lg opacity-50 -mt-1 -ml-4">
      {label}
    </div>
  );
};
export default HoverTooltip;
