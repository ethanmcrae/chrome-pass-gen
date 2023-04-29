import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface VerificationBarProps {
  isCopied: boolean;
}

const VerificationBar: React.FC<VerificationBarProps> = ({ isCopied }) => {
  return isCopied ? (
    <div className="absolute top-0 w-full px-4 py-2 z-40"
    style={{ background: "linear-gradient(325deg, rgba(93,66,156,.75) 0%, rgba(135,87,180,.75) 50%, rgba(167,106,201,.75) 100%)" }}>
      <div className="flex items-center text-white">
        <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />
        <span className="ml-2 text-lg">Password Copied</span>
      </div>
    </div>
  ) : <></>;
};

export default VerificationBar;
