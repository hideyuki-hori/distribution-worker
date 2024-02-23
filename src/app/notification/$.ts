import type { Observable } from 'rxjs'
import { filter, map, merge, throttleTime } from 'rxjs'
import * as camera from '~/$/camera'
import * as heatMap from '~/$/heat-map'
import * as mouse from '~/$/mouse'
import * as window from '~/$/window'
import type { NotificationKind, Notification } from '~/types/notification'

const info = create('info')
const succeed = create('succeed')
const failed = create('failed')
const warning = create('warning')

export const $: Observable<Notification> = merge(
  camera.accessRequested$.pipe(map(() => info('Camera access requested'))),
  camera.permissionUpdated$.pipe(
    filter(status => status === 'granted'),
    map(_ => succeed('Camera access granted')),
  ),
  camera.permissionUpdated$.pipe(
    filter(status => status === 'denied'),
    map(_ => warning('Camera access denied')),
  ),
  camera.unavailable$.pipe(map(cause => failed('Camera Unavailable', cause))),
  camera.mediaStreamCreated$.pipe(map(() => succeed('MediaStream created'))),
  heatMap.canvasMounted$.pipe(map(() => succeed('HeatMap canvas created'))),
  mouse.pressed$.pipe(map(() => info('Mouse pressed'))),
  mouse.released$.pipe(map(() => info('Mouse released'))),
  window.resized$.pipe(
    throttleTime(1000),
    map(({ width, height }) => info('Window resized', `width: ${width.toLocaleString()}, height: ${height.toLocaleString()}`)),
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
