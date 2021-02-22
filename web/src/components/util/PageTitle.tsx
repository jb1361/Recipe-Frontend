import React from 'react';

export const PageTitle = ({text}: {text: string}) => (
  <h3 style={{textAlign: 'center', position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1}}>{text}</h3>
);
