import React, {CSSProperties, useState} from 'react';
import {Card, Accordion} from 'react-bootstrap';
import styles from './AccordionTree.module.scss';
import {AccordionTreeRow, AccordionTreeSection} from '../AccordionTreeRow/AccordionTreeRow';
import IconButton from '../../widgets/IconButton/IconButton';

type SetExpandedFunctional = (expanded: boolean) => boolean;

interface Props {
  sections: AccordionTreeSection[];
  style?: CSSProperties;
  className?: string;
  setExpanded: (setExpanded: SetExpandedFunctional) => void;
  expanded: boolean;
  showExpander: boolean;
}

export function AccordionTree({className, sections, style, expanded, setExpanded, showExpander}: Props) {
  const [eventKey, setEventKey] = useState('');
  return (
    <Card className={className} style={{borderRadius: 0, position: 'relative', height: '100%', ...(style || {})}}>
      {showExpander && (
        <div className='d-flex flex-column align-items-end pr-1' style={accordionStyle}>
          <IconButton icon={expanded ? 'angle-double-left' : 'angle-double-right'} onClick={() => setExpanded(s => !s)} />
        </div>
      )}
      <Accordion activeKey={eventKey} className={styles['tree-accordion-menu']}>
          {sections.map(s => (
            <AccordionTreeRow
              key={s.eventKey}
              section={s}
              isOpen={s.eventKey === eventKey}
              onSetActiveKey={key => setEventKey(eventKey === key ? '' : key)}
            />
          ))}
      </Accordion>
    </Card>
  );
}

const accordionStyle: CSSProperties = {
  borderBottom: '1px solid rgba(0,0,0,.125)',
  padding: '5px 10px'
};
