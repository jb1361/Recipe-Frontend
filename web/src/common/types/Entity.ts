import {HasName} from './HasName';

export type NamedEntity = Entity & HasName;

export type Entity = HasId;

export interface HasId {
  id: number;
}
