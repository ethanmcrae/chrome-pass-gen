import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faClose } from '@fortawesome/free-solid-svg-icons';

interface Props {
  settingsPage: boolean;
  setSettingsPage: (settingsPage: boolean) => void;
}

const PageNav: React.FC<Props> = ({ settingsPage, setSettingsPage }) => {
  return (
    <FontAwesomeIcon icon={settingsPage ? faClose : faGear} className="text-customPurple-100 fixed z-30 top-0 left-0 ml-4 mt-4 text-lg" onClick={() => setSettingsPage(!settingsPage)} />
  );
};

export default PageNav;
