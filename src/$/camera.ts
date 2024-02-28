import { BehaviorSubject, Observable, Subject, map, merge, takeUntil } from 'rxjs'
import { CameraPermissionStatus } from '~/types/camera-permission-status'
import { CameraStatus } from '~/types/camera-status'

const accessRequestedSubject = new Subject<void>()
export const emitAccessRequested = () => accessRequestedSubject.next()
export const accessRequested$ = accessRequestedSubject.asObservable()

const permissionUpdatedSubject: BehaviorSubject<CameraPermissionStatus> = new BehaviorSubject<CameraPermissionStatus>('none')
export const emitPermissionUpdated = (status: CameraPermissionStatus) => permissionUpdatedSubject.next(status)
export const permissionUpdated$ = permissionUpdatedSubject.asObservable()

const mediaStreamCreatedSubject = new Subject<MediaStream>()
export const emitMediaStreamCreated = (stream: MediaStream) => mediaStreamCreatedSubject.next(stream)
export const mediaStreamCreated$ = mediaStreamCreatedSubject.asObservable()

const accessFailedSubject = new Subject<Error>()
export const emitAccessFailed = (error: Error) => accessFailedSubject.next(error)
export const accessFailed$ = accessFailedSubject.asObservable()

const unavailableSubject = new Subject<string>()
export const emitUnavailable = (description: string) => unavailableSubject.next(description)
export const unavailable$ = unavailableSubject.asObservable()

const capturedSubject = new Subject<Uint8ClampedArray>()
export const emitCapture = (capture: Uint8ClampedArray) => capturedSubject.next(capture)
export const captured$ = capturedSubject.asObservable()

export const statusUpdated$: Observable<CameraStatus> = merge(
  mapAs(accessRequested$, 'requesting'),
  mapAs(accessFailed$, 'no signal'),
  mapAs(captured$, 'activated'),
  mapAs(unavailable$, 'unavailable'),
)
  .pipe(takeUntil(unavailable$))

function mapAs(o: Observable<any>, status: CameraStatus) {
  return o.pipe(map(() => status))
}
