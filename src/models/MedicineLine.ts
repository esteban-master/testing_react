import type { QueryClient } from '@tanstack/react-query'

import { Medicine } from './Medicine'
import type { IMedicine, IMedicineLine } from './types'

export class MedicineLine {
  constructor(
    private readonly queryClient: QueryClient,
    private item: IMedicineLine
  ) {}

  get medicine() {
    const medicines = this.queryClient.getQueryData<{
      [key: number]: IMedicine
    }>(['medicines'])
    return medicines ? new Medicine(medicines[this.item.medicineId]) : undefined
  }

  get id() {
    return this.item.id
  }
}
