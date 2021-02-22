import React from 'react';
import {FaFile, FaFolder, FaFolderOpen} from 'react-icons/fa';
import {SelectionState, ToggleState} from './Tree';
import {CaretIcon} from '../../widgets/CaretIcon/CaretIcon';
import {Link} from 'react-router-dom';
import {TreeNodeData} from '../../../../types/TreeNodeData';
import {NodeIcon, StyledTreeNode} from './TreeNodeComponents';
import IconButton from '../../widgets/IconButton/IconButton';
import styles from './TreeNode.module.scss';
import {combineClasses} from '../../../../util';
import {Form} from 'react-bootstrap';
import {AppTheme} from '../../../../appTheme';

interface Props {
  node: TreeNodeData;
  getChildNodes: (node: TreeNodeData) => TreeNodeData[];
  level: number;
  onToggle: (node: TreeNodeData) => void;
  onNodeClick: (node: TreeNodeData) => void;
  onNodeSelect: (node: TreeNodeData) => void;
  toggleState: ToggleState;
  selectionState: SelectionState;
  selectionMode?: boolean;
}

const NodeLabel = (props: {node: TreeNodeData; onNodeClick: (node: TreeNodeData) => void}) => (
  <span className={styles['padded']} role='button' onClick={() => props.onNodeClick(props.node)}>
    {(props.node.label)}
  </span>
);

const TreeNode = (props: Props) => {
  const {node, getChildNodes, level, onToggle, onNodeClick} = props;
  const isOpen = props.toggleState[node.path];
  const Icon =
    (node.icon ? node.icon :
    node.type === 'file' ? FaFile :
    node.type === 'folder' && isOpen ? FaFolderOpen :
    node.type === 'folder' && !isOpen ? FaFolder : null)!;
  return (
    <React.Fragment>
      <StyledTreeNode level={level} type={node.type}>
        {props.selectionMode ?
          <Form.Check
            label=''
            custom={true}
            type='checkbox'
            id={node.path.replace('/', '_')}
            checked={Boolean(props.selectionState[node.path])}
            onChange={(_: any) => props.onNodeSelect(node)}
          /> : null}
        <NodeIcon className={combineClasses(styles['padded'], styles['hover'])} marginRight={0} onClick={() => onToggle(node)}>
          <span style={{paddingRight: 5, paddingLeft: 10}}>
            <CaretIcon disableMargin={true} isOpen={isOpen} isVisible={node.children != null}/>
          </span>
        </NodeIcon>
        <NodeIcon className={styles['padded']} marginRight={8}  onClick={() => onNodeClick(node)}>
          {!!Icon && <Icon/>}
        </NodeIcon>
        { props.node.link ? (
          <Link to={props.node.link} style={{color: AppTheme.colors.primaryTextColor, textDecoration: 'none'}} key={props.node.path}>
            <NodeLabel node={node} onNodeClick={onNodeClick}/>
          </Link>
        ) : (<NodeLabel node={node} onNodeClick={onNodeClick}/>)
        }
        <span>
          {props.node.addIcon &&
            <Link to={props.node.addIcon.path} style={{color: AppTheme.colors.primaryTextColor, display: 'flex'}}>
              <IconButton
                icon={'plus-circle'}
                size={'1x'}
                iconToolTipText={props.node.addIcon.label}
                styles={{marginLeft: 20}}
              />
            </Link>
          }
          {props.node.customAction && props.node.customAction}
        </span>
      </StyledTreeNode>
      {isOpen && getChildNodes(node).map(childNode => (
        <TreeNode
          key={childNode.path}
          {...props}
          node={childNode}
          level={level + 1}
        />
      ))}
    </React.Fragment>
  );
};

TreeNode.defaultProps = {
  level: 1
};

export default TreeNode;
