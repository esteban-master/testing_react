import type { IEntity } from './types'

export class Entity {
  constructor(private item: IEntity) {}

  get name() {
    return this.item.name
  }

  get id() {
    return this.item.id
  }
}
