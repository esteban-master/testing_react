import { faker } from '@faker-js/faker'
import type { BuildOptions } from 'fishery'
import { Factory } from 'fishery'

import type { IMedicine } from '../../models'

const medicineFactory = Factory.define<Medicine>(({ sequence }) => ({
  createdAt: faker.date.past().toISOString(),
  dose: faker.random.word(),
  id: sequence,
  management: faker.random.word(),
  name: `${faker.random.word()}-${sequence}`,
  updatedAt: faker.date.past().toISOString(),
}))

export const generateMedicine = (params?: Partial<IMedicine>) => {
  return medicineFactory.build(params)
}

export const generateMedicineList = (
  number = 10,
  params?: Partial<Medicine>,
  options?: BuildOptions<IMedicine, any>
) => {
  return medicineFactory.buildList(number, params, options)
}
