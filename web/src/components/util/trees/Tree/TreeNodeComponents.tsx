import {NodeType} from './Tree';
import styles from './TreeNodeComponents.module.scss';
import React from 'react';
import {combineClasses} from '../../../../util';

interface StyledTreeNodeProps { level: number; type: NodeType; children: any; }

export const StyledTreeNode = (props: StyledTreeNodeProps) => (
  <div className={styles['tree-node']} style={{paddingLeft: props.level * 15}}>
    {props.children}
  </div>
);

interface NodeIconProps {
  marginRight?: number;
  children: any;
  className?: string;
  onClick?: () => void;
}

export const NodeIcon = (props: NodeIconProps) => (
  <div
    className={combineClasses(styles['node-icon'], props.className)}
    style={props.marginRight ? {marginRight: props.marginRight} : undefined}
    onClick={props.onClick}
  >
    {props.children}
  </div>
);
