import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import uuid from 'uuid';
import React, {PureComponent} from 'react';

interface DefaultToolTipProps {
  text?: string;
  children: any;
}

export class AppToolTip extends PureComponent<DefaultToolTipProps> {
  uuid = uuid();

  render() {
    if (!this.props.text) {
      return this.props.children;
    }
    return (
      <OverlayTrigger
        overlay={
          <Tooltip id={this.uuid}>
            {this.props.text}
          </Tooltip>
        }
      >
        {this.props.children}
      </OverlayTrigger>
    );
  }

}
