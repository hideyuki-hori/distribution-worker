import { Observable, merge } from 'rxjs'
import { filter, map, reduce, startWith, switchMap, take, takeUntil, windowTime } from 'rxjs/operators'
import { accessRequested$, accessFailed$, captured$, unavailable$, permissionUpdated$ } from '~/$/camera'
import { everyUpdated$ } from '~/$/scheduler'
import { CameraStatus } from '~/types/camera-status'

export const $: Observable<CameraStatus> = merge(
  accessRequested$.pipe(mapAs('requesting')),
  accessFailed$.pipe(mapAs('no signal')),
  captured$.pipe(mapAs('activated'), take(1)),
)
  .pipe(
    startWith('no signal' as CameraStatus),
    takeUntil(unavailable$),
  )

function mapAs(status: CameraStatus) {
  return map(() => status)
}

export const denied$ = permissionUpdated$.pipe(
  filter(permission => permission === 'denied'),
)

export const actual$ = everyUpdated$.pipe(
  windowTime(1000),
  switchMap(window =>
    window.pipe(
      map(() => 1),
      reduce((acc, _) => acc + 1, 0)
    )
  )
)