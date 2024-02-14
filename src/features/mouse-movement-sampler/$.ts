import {
  bufferTime,
  Observable,
  fromEvent,
  map,
} from 'rxjs'
import type {
  MouseMoveEvent,
  Movement,
} from './types'

const initialState: Movement = {
  count: 0,
  x: 0,
  y: 0,
  total: 0,
}

export const mouseMove$: Observable<Movement> = fromEvent<MouseEvent>(document, 'mousemove').pipe(
  map(event => ({ x: event.movementX, y: event.movementY })),
  bufferTime(1000),
  map(events => {
    return events.reduce<Movement>((previous, current: MouseMoveEvent) => {
      const newX = previous.x + current.x
      const newY = previous.y + current.y
      return {
        count: previous.count + 1,
        x: newX,
        y: newY,
        total: previous.total + Math.sqrt(current.x ** 2 + current.y ** 2),
      }
    }, initialState)
  }),
)