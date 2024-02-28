import type { Observable } from 'rxjs'
import { filter, map, merge, take, throttleTime } from 'rxjs'
import * as camera from '~/$/camera'
import * as heatMap from '~/$/background'
import * as integrator from '~/$/interaction'
import * as mouse from '~/$/mouse'
import * as window from '~/$/window'
import type { NotificationKind } from '~/types/notification-kind'
import type { Notification } from '~/types/notification'

const info = create('info')
const succeed = create('succeed')
const failed = create('failed')
const warning = create('warning')

export const $: Observable<Notification> = merge(
  camera.accessRequested$.pipe(map(() => info('Camera Access Requested'))),
  camera.permissionUpdated$.pipe(
    filter(status => status === 'granted'),
    map(_ => succeed('Camera Access Granted')),
  ),
  camera.permissionUpdated$.pipe(
    filter(status => status === 'denied'),
    map(_ => warning('Camera Access Denied')),
  ),
  camera.unavailable$.pipe(map(cause => failed('Camera Unavailable', cause))),
  camera.mediaStreamCreated$.pipe(map(() => succeed('MediaStream Created'))),
  camera.captured$.pipe(take(1), map(() => succeed('Heat Map Rendering Started'))),
  integrator.calculationProcessLocationUpdated$.pipe(
    filter(c => c === 'MainThread'),
    map(_ => info('Process Location', 'Switched to Main Thread')),
  ),
  integrator.calculationProcessLocationUpdated$.pipe(
    filter(c => c === 'WebWorker'),
    map(_ => info('Process Location', 'Switched to Web Worker')),
  ),
  heatMap.canvasMounted$.pipe(map(() => succeed('Background canvas Created'))),
  mouse.pressed$.pipe(map(() => info('Mouse Pressed'))),
  mouse.released$.pipe(map(() => info('Mouse Peleased'))),
  window.resized$.pipe(
    throttleTime(1000),
    map(({ width, height }) => info('Window Resized', `width: ${width.toLocaleString()}, height: ${height.toLocaleString()}`)),
  ),
)

function create(kind: NotificationKind) {
  return (title: string, description?: string): Notification => ({
    kind,
    title,
    description,
    at: new Date(),
  })
}
