import { interval, map, merge, scan, startWith, switchMap, takeUntil } from 'rxjs'
import { pressed$, released$ } from '~/$/mouse'

export const $ = merge(
  pressed$.pipe(map(() => 5)),
  released$.pipe(map(() => 0)),
)
  .pipe(
    switchMap(value => value === 0 ? [0] : interval(800).pipe(
      startWith(value),
      scan(current => Math.min(current + 10, 100), value - 5),
      takeUntil(released$),
    ))
  )