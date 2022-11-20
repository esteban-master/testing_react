import type { IMedicine } from './types'

export class Medicine {
  constructor(private item: IMedicine) {}

  get name() {
    return this.item.name
  }

  get id() {
    return this.item.id
  }
}
