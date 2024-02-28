import { from, of } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { accessRequested$, emitAccessFailed, emitMediaStreamCreated, emitPermissionUpdated } from '~/$/camera'

export function watchAccessRequested() {
  accessRequested$.pipe(
    switchMap(() =>
      from(navigator.mediaDevices.getUserMedia({ video: true })).pipe(
        tap((mediaStream) => {
          emitMediaStreamCreated(mediaStream)
          emitPermissionUpdated('granted')
        }),
        catchError(error => {
          emitAccessFailed(error)
          emitPermissionUpdated('denied')
          return of()
        }),
      ),
    ),
  ).subscribe()
}