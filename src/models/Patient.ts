import type { QueryClient } from '@tanstack/react-query'

import { Entity } from './Entity'
import type { IPatient, IEntity } from './types'

export class Patient {
  constructor(
    private readonly queryClient: QueryClient,
    private item: IPatient
  ) {}

  get entity(): Entity | undefined {
    const entities = this.queryClient.getQueryData<{ [key: number]: IEntity }>([
      'entities',
    ])
    return entities ? new Entity(entities[this.item.entityId]) : undefined
  }

  get id() {
    return this.item.id
  }
}
