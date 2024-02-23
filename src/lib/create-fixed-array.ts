export function createFixedArray<T>(size: number): Array<T> {
  const handler: ProxyHandler<Array<T>> = {
    get(target: Array<T>, property: string | symbol, receiver: any): any {
      switch (property) {
        case 'push': return (...args: T[]): number => {
          args.forEach(item => {
            if (target.length >= size) {
              target.shift()
            }
            Array.prototype.push.call(target, item)
          })
          return target.length
        }
        case 'unshift': return (...args: T[]): number => {
          args.reverse().forEach(item => {
            if (target.length >= size) {
              target.pop()
            }
            Array.prototype.unshift.call(target, item)
          })
          return target.length
        }
        case 'splice': return (start: number, deleteCount?: number, ...items: T[]): T[] => {
          const actualDeleteCount = deleteCount !== undefined
            ? Math.min(deleteCount, target.length - start)
            : target.length - start
          const excessItems = Math.max(0, target.length + items.length - actualDeleteCount - size)
          const itemsToAdd = items.slice(0, items.length - excessItems)
          return Array.prototype.splice.call(target, start, actualDeleteCount, ...itemsToAdd)
        }
      }
      return Reflect.get(target, property, receiver)
    }
  }

  return new Proxy<Array<T>>([], handler)
}
