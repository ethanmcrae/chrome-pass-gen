import React from "react";

interface Props {
  state: boolean;
  setState: (state: boolean) => void;
  label: string;
}

const AppleToggle: React.FC<Props> = ({ state, setState, label }) => {
  return (
    <label htmlFor="toggle" className="inline-flex items-center cursor-pointer">
      <span className="text-xs mr-3">{label}</span>
      <div className="relative">
        <input
          id="toggle"
          type="checkbox"
          className="sr-only toggle-checkbox"
          checked={state}
          onChange={(e) => setState(e.target.checked)}
        />
        <div className="toggle-switch w-10 h-6 rounded-full"></div>
        <div className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-200"></div>
      </div>
    </label>
  );
};

export default AppleToggle;
