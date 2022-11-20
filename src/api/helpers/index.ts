export function apiNormalization<T extends { id: number }>(data: T[]) {
  return data.reduce<{ [key: number]: T }>((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})
}
