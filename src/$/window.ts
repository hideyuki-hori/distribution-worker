import { fromEvent, map } from 'rxjs'

export const resized$ = fromEvent(window, 'resize')
  .pipe(map(() => ({ width: window.innerWidth, height: window.innerHeight })))
