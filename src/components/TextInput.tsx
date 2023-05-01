import React from "react";
import { TextInputProps } from "../types";

const TextInput: React.FC<TextInputProps> = ({ type, label, value, onUpdate }) => {
  return (
    <div className="relative text-base text-gray-700">
      <label
        htmlFor="email"
        className="absolute top-0 left-0 ml-4 mt-4 text-gray-500 transition-all duration-200 transform pointer-events-none"
      >
        { label }
      </label>
      <input
        type={type}
        id="email"
        name="email"
        value={value}
        className="mui-input block w-full px-3 pt-4 pb-1 mt-1 border border-gray-300 rounded-md focus:border-customPurple-800 focus:ring-1 focus:ring-customPurple-800 focus:outline-none transition-all duration-200"
        onFocus={(e: any) => {
          e.target.previousSibling.classList.add("translate-y-[-0.75rem]");
          e.target.previousSibling.classList.add("text-xs");
          e.target.previousSibling.classList.add("translate-x-[-0.17rem]");
        }}
        onBlur={(e: any) => {
          if (!e.target.value) {
            e.target.previousSibling.classList.remove("translate-y-[-0.75rem]");
            e.target.previousSibling.classList.remove("text-xs");
            e.target.previousSibling.classList.remove("translate-x-[-0.17rem]");
          }
        }}
      />
    </div>
  );
};

export default TextInput;
