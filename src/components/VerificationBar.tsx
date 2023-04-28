import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface VerificationBarProps {
  isCopied: boolean;
}

const VerificationBar: React.FC<VerificationBarProps> = ({ isCopied }) => {
  return isCopied ? (
    <div className="absolute top-0 w-full px-4 py-2 bg-blue-600">
      <div className="flex items-center text-white">
        <FontAwesomeIcon icon={faCheckCircle} />
        <span className="ml-2">Copied</span>
      </div>
    </div>
  ) : <></>;
};

export default VerificationBar;
