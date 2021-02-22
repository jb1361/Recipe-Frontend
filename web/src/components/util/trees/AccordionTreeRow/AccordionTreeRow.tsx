import React, {Component} from 'react';
import {Accordion, Card} from 'react-bootstrap';
import {CaretIcon} from '../../widgets/CaretIcon/CaretIcon';
import styles from './AccordionTreeRow.module.scss';
import Tree, {TreeData} from '../Tree/Tree';

import {Link} from 'react-router-dom';
import IconButton from '../../widgets/IconButton/IconButton';
import {convertToKebabCase} from '../../../../common/util/string';
import {AppTheme} from '../../../../appTheme';

export interface AccordionTreeSection {
  eventKey: string;
  treeName: string;
  treeData: TreeData;
  addIcon?: {
    path: string;
    label: string;
  };
}

export function makeTreeSection(treeData: TreeData, treeName: string, addIcon?: { path: string; label: string}): AccordionTreeSection {
  return  {
    eventKey: convertToKebabCase(treeName),
    treeData: treeData,
    treeName: treeName,
    addIcon: addIcon
  };
}

interface AccordionTreeRowProps {
  section: AccordionTreeSection;
  isOpen: boolean;
  onSetActiveKey: (eventKey: string) => void;
}

export class AccordionTreeRow extends Component<AccordionTreeRowProps> {

  state = {
    activeKey: ''
  };

  setActiveKey = (eventKey: string) => {
   this.props.onSetActiveKey(eventKey);
  };

  render() {
    const section = this.props.section;
    return (
      <React.Fragment>
        <Accordion.Toggle as={Card.Header} eventKey={section.eventKey} style={{display: 'flex', paddingLeft: '0.5rem'}}>
          <span onClick={() => this.setActiveKey(section.eventKey)} className={styles['accordion-caret-container']}>
            <span className={styles['accordion-caret-span']}>
              <CaretIcon disableMargin={true} isOpen={this.props.isOpen} isVisible={section.treeData != null}/>
            </span>
            {section.treeName}
          </span>
          {section.addIcon && this.props.isOpen ?
          <Link to={section.addIcon.path} className={styles['accordion-body-link']}>
            <IconButton
              icon={'plus-circle'}
              size={'1x'}
              linkStyle={AppTheme.styles.primaryTextColor}
              iconToolTipText={section.addIcon.label}
              styles={{marginLeft: 20}}
            />
          </Link> : null
          }
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={section.eventKey} className={styles['accordion-body']}>
          <Tree data={section.treeData}/>
        </Accordion.Collapse>
      </React.Fragment>
    );
  }
}
