import React from 'react';
import styles from './OrderedDraggableList.module.scss';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {OrderedDraggableListRow} from '../OrderedDraggableListRow/OrderedDraggableListRow';
import {Card} from 'react-bootstrap';
import {typedMemo} from '../../../../util/react-util';

interface Props<T> {
  editable: boolean;
  items: T[];
  renderItem: (item: T, index: number) => any;
  prefix: string;
  move: (from: number, to: number) => void;
  noItemsLabel: string;
}

export const OrderedDraggableList = typedMemo(<T extends any>(props: Props<T>) => {
  const {move, noItemsLabel, editable, prefix, items, renderItem} = props;
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    move(result.source.index, result.destination.index);
  };

  const renderNoItems = () => (
    <Card style={{textAlign: 'center'}}>
      <Card.Body>{noItemsLabel}</Card.Body>
    </Card>
  );

  const draggableListCards = items.map((item: T, index: number) => (
    item ? (
      <OrderedDraggableListRow
        editable={editable}
        key={`${prefix}.${index}`}
        prefix={prefix}
        index={index}
      >
        {renderItem(item, index)}
      </OrderedDraggableListRow>
      ) : null
  ));

  return items.length === 0 ?
    renderNoItems() : (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={prefix}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles['list-table']}
            >
              {draggableListCards}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );

});
