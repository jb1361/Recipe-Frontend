import React from 'react';
import { Menu, Item, Separator} from 'react-contexify';
// tslint:disable-next-line
import 'react-contexify/dist/ReactContexify.min.css';
// tslint:disable-next-line
import {MenuItemEventHandler} from 'react-contexify/src/types/index';

export class ContextMenu extends React.Component {
  render() {
    // tslint:disable-next-line:no-console
    const onClick = ({ event, props }: MenuItemEventHandler) => console.log(event, props);
    return (
      <Menu id='menu_id'>
        <Item onClick={onClick}>Add</Item>
        <Item onClick={onClick}>Rename</Item>
        <Separator />
        <Item disabled={true}>Delete</Item>
        <Separator />
      </Menu>
    );
  }
}
