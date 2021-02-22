import {NodeType, TreeData} from '../components/util/trees/Tree/Tree';
import {IconType} from 'react-icons';
import {NamedEntity} from '../common/types/Entity';

export interface TreeNodeData {
  path: string;
  label: string;
  type: NodeType;
  children?: string[];
  content?: string;
  link?: string;
  data?: any;
  icon?: IconType;
  addIcon?: AddIconParams;
  customAction?: JSX.Element;
}

export interface AddIconParams {
  path: string;
  label: string;
}

export function makeTreeFolder(treeData: TreeData, path: string, name: string, children: string[], addIcon?: AddIconParams): string {
  treeData[path] = {
    path: path,
    type: 'folder',
    label: name,
    children: children,
    addIcon: addIcon
  };
  return path;
}

export function makeTreeFile(treeData: TreeData, path: string, name: string, link: string): string {
  treeData[path] = {
    path: path,
    label: name,
    type: 'file',
    link: link
  };
  return path;
}

export type RenderItemChildren<T> = (manufacturer: T, prefix: string) => string[];

export function buildSubTree<T extends NamedEntity>(treeData: TreeData, prefix: string, items: T[], renderChildren: RenderItemChildren<T>) {
  return items.map(item => {
    const itemPath = `${prefix}/${item.id}`;
    return makeTreeFolder(treeData, itemPath, item.name, renderChildren(item, itemPath));
  });
}

export function buildBottomTree<T extends NamedEntity>(treeData: TreeData, prefix: string, items: T[], getLink: (item: T) => string) {
  return items.map(item => {
    const itemPath = `${prefix}/${item.id}`;
    return makeTreeFile(treeData, itemPath, item.name, getLink(item));
  });
}
