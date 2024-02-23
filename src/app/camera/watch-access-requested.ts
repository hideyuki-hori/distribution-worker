import { from, of } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { accessRequested$, emitAccessFailed, emitMediaStreamCreated } from '~/$/camera'

export function watchAccessRequested() {
  accessRequested$.pipe(
    switchMap(() =>
      from(navigator.mediaDevices.getUserMedia({ video: true })).pipe(
        tap(emitMediaStreamCreated),
        catchError(error => {
          emitAccessFailed(error)
          return of()
        })
      )
    ),
  ).subscribe()
}