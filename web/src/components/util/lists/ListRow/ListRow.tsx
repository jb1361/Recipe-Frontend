import {Row} from 'react-bootstrap';
import React from 'react';

export function ListRow({children, noGutters}: { children: any; noGutters?: boolean}) {
  return (
    <Row noGutters={noGutters ?? true} style={{border: '1px solid rgba(0,0,0,.125)', padding: '1rem 1.25rem'}}>
      {children}
    </Row>
  );
}

export function DivListRow({children}: { children: any}) {
  return (
    <div style={{border: '1px solid rgba(0,0,0,.125)', padding: '1rem 1.25rem'}}>
      {children}
    </div>
  );
}
