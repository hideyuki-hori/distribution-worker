import { Observable, merge } from 'rxjs'
import { bufferTime, filter, map, startWith, take, takeUntil } from 'rxjs/operators'
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
  bufferTime(1000),
  map(deltas => {
    const frame = deltas.length
    const total = deltas.reduce((total, delta) => total + delta, 0)
    const average = total / frame
    return average
  }),
  filter(isFinite),
)