import React from 'react';
import styles from './OrderedDraggableListRow.module.scss';
import {
  Draggable
} from 'react-beautiful-dnd';

interface Props {
  editable: boolean;
  children: any;
  prefix: string;
  index: number;
}

export class OrderedDraggableListRow extends React.Component<Props> {

  render() {
    return (
      <React.Fragment>
        <Draggable
          key={`${this.props.prefix}.${this.props.index}`}
          draggableId={`${this.props.prefix}.${this.props.index}`}
          index={this.props.index}
          isDragDisabled={!this.props.editable}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              className={styles['draggable-card']}
              style={provided.draggableProps.style}
            >
              {this.props.children}
            </div>
          )}
        </Draggable>
      </React.Fragment>
    );
  }
}
