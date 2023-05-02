import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { DropdownProps } from '../types';

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const buttonClasses =
    "mui-input block bg-gray-700 text-gray-200 w-full px-3 py-1 mt-3 border-customPurple-300 rounded-md focus:bg-gray-600 focus:text-gray-200 focus:border-customPurple-300 focus:ring-1 focus:ring-customPurple-300 outline-none transition-all duration-200 text-left";

  const arrowIconClasses = clsx(
    'absolute top-5 right-4 w-4 h-4 transform transition-transform duration-200',
    {
      'rotate-180': isOpen,
    }
  );

  return (
    <div ref={dropdownRef} className="relative w-full text-base text-gray-400">
      <button
        className={buttonClasses}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <svg
          className={arrowIconClasses}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full py-1 bg-white shadow-lg rounded-md">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default Dropdown;
