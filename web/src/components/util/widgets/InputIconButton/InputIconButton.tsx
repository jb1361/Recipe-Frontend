import React from 'react';
import {Form} from 'react-bootstrap';
import IconButton from '../IconButton/IconButton';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

interface InputIconButtonProps {
  inputComponent: any;
  icon: IconProp;
  iconToolTip: string;
  onClick: () => void;
}

export const InputIconButton = (props: InputIconButtonProps) => (
  <Form.Group style={{display: 'flex', alignItems: 'center'}}>
    <div style={{flexShrink: 1, flexGrow: 1}}>
    {props.inputComponent}
    </div>
    <IconButton
      icon={props.icon}
      size='2x'
      onClick={props.onClick}
      iconToolTipText={props.iconToolTip}
      styles={{marginLeft: '5px'}}
    />
  </Form.Group>
);
