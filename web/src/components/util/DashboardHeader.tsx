import {BackButton} from './BackButton';
import {PageTitle} from './PageTitle';
import React, {CSSProperties} from 'react';

interface Props {
  title: string;
  backButton?: {
    text: string;
    link: string;
  };
  style?: CSSProperties;
}

export function DashboardHeader({backButton, title, style}: Props) {
  return (
    <div style={{position: 'relative', ...style}}>
      {backButton && <BackButton label={backButton.text} link={backButton.link} />}
      <PageTitle text={title} />
    </div>
  );
}
