import IconButton from './widgets/IconButton/IconButton';
import React from 'react';

export const BackButton = ({link, label}: {link: string; label: string})  => (
  <IconButton
    linkStyle={{display: 'flex', alignItems: 'center'}}
    styles={{flexGrow: 1, position: 'relative', zIndex: 2}}
    icon='chevron-left'
    link={link}
    size={'2x'}
  >
    {label}
  </IconButton>
);
