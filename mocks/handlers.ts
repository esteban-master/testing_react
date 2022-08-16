import { rest } from 'msw'

import type { Data } from '../src/models'

import data from './data'

export const getMedicalRecord = (
  response: Partial<Data> = data,
  status: number = 200,
  delay: number = 0
) => {
  return rest.get('/medical_records', (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.status(status), ctx.json(response))
  })
}

export const handlers = [getMedicalRecord()]
