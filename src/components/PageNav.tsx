import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faClose } from '@fortawesome/free-solid-svg-icons';
import { PageNavProps } from '../types';

const PageNav: React.FC<PageNavProps> = ({ settingsPage, setSettingsPage }) => {
  return (
    <FontAwesomeIcon icon={settingsPage ? faClose : faGear} className="text-customPurple-100 fixed z-30 top-0 left-0 ml-3 mt-3 text-lg hover:brightness-110 transition ease-out duration-300 cursor-pointer" onClick={() => setSettingsPage(!settingsPage)} />
  );
};

export default PageNav;
