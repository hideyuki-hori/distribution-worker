import { bufferTime, map } from 'rxjs'
import { moved$ } from '~/$/mouse'
import { MouseMoveEvent } from '~/types/mouse-move-event'
import { MouseMovement } from '~/types/mouse-movement'

const initialState: MouseMovement = {
  occurred: 0,
  x: 0,
  y: 0,
  amount: 0,
}

export const $ = moved$.pipe(
  bufferTime(1000),
  map(events => events.reduce<MouseMovement>((previous, current: MouseMoveEvent) => ({
    occurred: previous.occurred + 1,
    x: Math.abs(previous.x) + Math.abs(current.x),
    y: Math.abs(previous.y) + Math.abs(current.y),
    amount: previous.amount + Math.sqrt(current.x ** 2 + current.y ** 2),
  }), initialState)),
)