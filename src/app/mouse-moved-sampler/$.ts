import { bufferTime, map } from 'rxjs'
import { moved$ } from '~/$/mouse'
import { MouseMoveEvent, Movement } from './types'

const initialState: Movement = {
  occurred: 0,
  x: 0,
  y: 0,
  amount: 0,
}

export const $ = moved$.pipe(
  bufferTime(1000),
  map(events => events.reduce<Movement>((previous, current: MouseMoveEvent) => {
    const newX = previous.x + current.x
    const newY = previous.y + current.y
    return {
      occurred: previous.occurred + 1,
      x: newX,
      y: newY,
      amount: previous.amount + Math.sqrt(current.x ** 2 + current.y ** 2),
    }
  }, initialState)),
)