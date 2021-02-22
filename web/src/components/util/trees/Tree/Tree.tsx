import React, { Component } from 'react';
import {values} from 'lodash';
import TreeNode from './TreeNode';
import {TreeNodeData} from '../../../../types/TreeNodeData';
import {cloneObjectWithoutProperties} from '../../../../common/util/object';

export type NodeType = 'file' | 'folder' | string;

export interface ToggleState extends Record<string, boolean> {}
export interface SelectionState extends Record<string, boolean> {}

interface TreeState {
  toggled: ToggleState;
  selection: SelectionState;
}

export interface TreeData {
  [key: string]: TreeNodeData;
}

interface TreeProps {
  onClick?: (node: TreeNodeData) => void;
  onSelectionChanged?: (selection: SelectionState) => void;
  selectionMode?: boolean;
  data: TreeData;
}

export default class Tree extends Component<TreeProps, TreeState> {

  state: TreeState = {
    toggled: {},
    selection: {}
  };

  getRootNodes = () => {
    const nodes = this.props.data;
    return values(nodes).filter((node: TreeNodeData) => (node.path.match(/\//g) || []).length === 1);
  };

  getChildNodes = (node: TreeNodeData) => {
    const nodes = this.props.data;
    if (!node.children) {
      return [];
    }
    return node.children.map(path => {
      if (nodes[path] === undefined) {
        // tslint:disable-next-line:no-console
        console.error(`Could not locate child node at path: ${path}, with the given nodes: `, nodes );
      }
      return nodes[path];
    });
  };

  onToggle = (node: TreeNodeData) => {
    if (this.state.toggled[node.path]) {
      this.setState({ toggled: cloneObjectWithoutProperties(this.state.toggled, node.path) });
    } else {
      this.setState({ toggled: {...this.state.toggled, [node.path]: true} });
    }
  };

  onNodeClick = (node: TreeNodeData) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(node);
    }
  };

  callOnSelectionChanged() {
    const {onSelectionChanged} = this.props;
    if (onSelectionChanged) {
      onSelectionChanged(this.state.selection);
    }
  }

  onNodeSelect = (node: TreeNodeData) => {
    if (this.state.selection[node.path]) {
      const newSelection = cloneObjectWithoutProperties(this.state.selection, node.path);
      for (const path of Object.keys(this.state.selection)) {
        if (path.indexOf(node.path) !== -1) {
          delete newSelection[path];
        }
      }
      this.setState({ selection:  newSelection}, () => this.callOnSelectionChanged());
    } else {
      const newSelection = {...this.state.selection, [node.path]: true};
      for (const path of Object.keys(this.props.data)) {
        if (path.indexOf(node.path) !== -1) {
          newSelection[path] = true;
        }
      }
      this.setState({ selection: newSelection }, () => this.callOnSelectionChanged());
    }
  };

  render() {
    const rootNodes = this.getRootNodes();
    return (
      <div>
        { rootNodes.map(node => (
          <TreeNode
            key={node.path}
            toggleState={this.state.toggled}
            selectionState={this.state.selection}
            selectionMode={this.props.selectionMode}
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeClick={this.onNodeClick}
            onNodeSelect={this.onNodeSelect}
          />
        ))}
      </div>
    );
  }
}
