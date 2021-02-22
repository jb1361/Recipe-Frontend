import React, {CSSProperties} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface CaretIconProps {
  isOpen: boolean;
  isVisible?: boolean;
  disableMargin?: boolean;
}

export function CaretIcon(props: CaretIconProps) {
  const style = {
    cursor: 'pointer',
    marginRight: props.disableMargin ? 0 : 8
  };
  if (props.isVisible || props.isVisible === undefined) {
    return props.isOpen ?  <FontAwesomeIcon icon={'caret-down'} size={'sm'} style={style} />
      : <FontAwesomeIcon icon={'caret-right'} size={'sm'} style={style} /> ;
  }
  return null;
}
interface CaretIconButtonProps extends CaretIconProps {
  onClick: () => void;
  style?: CSSProperties;
}
export function CaretIconButton(props: CaretIconButtonProps) {
  const {onClick, style, ...cartIconProps} = props;
  return (
    <span onClick={onClick} style={{cursor: 'pointer', ...style}}>
      <CaretIcon {...cartIconProps}/>
    </span>
  );
}
