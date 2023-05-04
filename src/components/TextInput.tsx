import React from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { TextInputProps } from "../types";

const TextInput: React.FC<TextInputProps> = ({ type, label, value, onUpdate, onReset=undefined, showReset=false }) => {

  const labelClasses = clsx(
    "absolute top-0 left-0 ml-4 mt-4 text-gray-200 transition-all duration-200 transform pointer-events-none",
    {
      "translate-y-[-0.75rem]": value,
      "text-xs": value,
      "translate-x-[-0.17rem]": value,
      "text-gray-400": value,
      "pr-8": showReset,
    }
  );

  const inputClasses =
    "mui-input block bg-gray-700 text-gray-200 w-full px-3 pt-4 pb-1 mt-1 border-customPurple-300 rounded-md focus:bg-gray-600 focus:text-gray-200 focus:border-customPurple-300 focus:ring-1 focus:ring-customPurple-300 outline-none transition-all duration-200";

  // TODO: 
  
  return (
    <div className="relative text-base text-gray-400">
      <label
        htmlFor={label.toLowerCase()}
        className={labelClasses}
      >
        { label }
      </label>
      <input
        type={type}
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        value={value}
        onChange={onUpdate}
        className={inputClasses}
        onFocus={(e: any) => {
          e.target.previousSibling.classList.add("translate-y-[-0.75rem]");
          e.target.previousSibling.classList.add("text-xs");
          e.target.previousSibling.classList.add("translate-x-[-0.17rem]");
          e.target.previousSibling.classList.add("text-gray-400");
        }}
        onBlur={(e: any) => {
          if (!e.target.value) {
            e.target.previousSibling.classList.remove("translate-y-[-0.75rem]");
            e.target.previousSibling.classList.remove("text-xs");
            e.target.previousSibling.classList.remove("translate-x-[-0.17rem]");
            e.target.previousSibling.classList.remove("text-gray-400");
          }
        }}
      />
      { showReset && (
        <div className="absolute top-1/2 right-3">
          <FontAwesomeIcon icon={faRefresh} className="text-gray-400 cursor-pointer transform -translate-y-1/2" onClick={onReset} />
        </div>
      )}
    </div>
  );
};

export default TextInput;
