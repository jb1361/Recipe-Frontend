import React from 'react';
import {Col} from 'react-bootstrap';
import IconButton from '../../widgets/IconButton/IconButton';
import {ListRow} from '../ListRow/ListRow';

interface Props {
  editable: boolean;
  onDelete?: () => void;
  disableDelete?: boolean;
  renderContent?: () => JSX.Element | string | number;
  render?: () => JSX.Element | string | number;
  deleteColumnSize?: number;
  noGutters?: boolean;
}

export function DeletableListRow({editable, renderContent, onDelete, disableDelete, deleteColumnSize, render, noGutters}: Props) {
  return (
    <ListRow noGutters={noGutters}>
      {render && render()}
      {!render && renderContent && (
        <Col xs={4}>
          {renderContent()}
        </Col>
      )}
      {onDelete &&
        <Col className='d-flex justify-content-end align-items-center' xs={deleteColumnSize ?? 8}>
          <IconButton
            icon={'trash-alt'}
            hideIcon={!editable}
            size={'1x'}
            styles={{color: editable && !disableDelete ? 'red' : 'black'}}
            onClick={() => editable && !disableDelete ? onDelete() : null}
          />
        </Col>
      }
    </ListRow>
  );
}
