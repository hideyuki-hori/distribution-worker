import { fromEvent, map } from 'rxjs'

export const pressed$ = fromEvent(document, 'mousedown')
export const released$ = fromEvent(document, 'mouseup')
export const moved$ = fromEvent<MouseEvent>(document, 'mousemove')
  .pipe(map(event => ({ x: event.movementX, y: event.movementY })))
