import React, {CSSProperties, memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp, SizeProp} from '@fortawesome/fontawesome-svg-core';
import styles from './IconButton.module.scss';
import {Link} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

interface IconButtonProps {
  icon: IconProp;
  hideIcon?: boolean;
  size?: SizeProp;
  customSize?: number;
  styles?: CSSProperties;
  linkStyle?: CSSProperties;
  iconToolTipText?: string;
  onClick?: () => void;
  children?: any;
  link?: string;
  disableHover?: boolean;
  className?: string;
  color?: string;
}

const IconButton = memo((props: IconButtonProps) => {
  const style = { cursor: 'pointer', ...props.styles, ...(props.color ? {color: props.color} : {}) };
  let button = null;
  const commonProps = {
    'data-tip': props.iconToolTipText,
    'className': styles['icon-button'],
    'style': {display: 'flex', alignItems: 'center'},
    'hidden': props.hideIcon
  };
  if (props.link) {
    button = (
      <Link {...commonProps} to={props.link} style={props.linkStyle}>
        <IconButtonIcon {...props} />
      </Link>
    );
  } else {
    button =  (
      <span {...commonProps} onClick={props.onClick} style={props.linkStyle}>
        <IconButtonIcon {...props} />
      </span>
    );
  }
  return (
    <span style={{display: 'inline-block', ...style}} className={props.className}>{button}</span>
  );
});

function IconButtonIcon(props: IconButtonProps) {
  return (
    <React.Fragment>
      <ReactTooltip effect={'float'}/>
      <FontAwesomeIcon
        icon={props.icon}
        size={props.size}
        className={styles['icon']}
        style={{cursor: 'pointer', ...(props.customSize ? {fontSize: props.customSize} : {})}}
      />
      {props.children ? <span style={{marginLeft: '1rem'}}>{props.children}</span> : null}
    </React.Fragment>
  );
}

export default IconButton;
