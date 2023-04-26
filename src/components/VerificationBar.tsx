import React from 'react';

interface VerificationBarProps {
  isCopied: boolean;
}

const VerificationBar: React.FC<VerificationBarProps> = ({ isCopied }) => {
  return (
    <div className="w-full px-4 py-2 bg-blue-600">
      {isCopied && (
        <div className="flex items-center text-white">
          <i className="material-icons">check_circle</i>
          <span className="ml-2">Copied</span>
        </div>
      )}
    </div>
  );
};

export default VerificationBar;
