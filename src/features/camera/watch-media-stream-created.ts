import { switchMap, fromEvent, EMPTY, from, tap, catchError } from 'rxjs'
import { emitCapture, emitUnavailable, mediaStreamCreated$ } from '~/$/camera'
import { everyUpdated$ } from '~/$/scheduler'
import { VIDEO_CAPTURE_SIZE as SIZE } from '~/app'

export function watchMediaStreamCreated() {
  mediaStreamCreated$.pipe(
    switchMap(mediaStream => {
      const video = document.createElement('video')
      video.srcObject = mediaStream
      const canvas = document.createElement('canvas')
      const context2d = canvas.getContext('2d', { willReadFrequently: true })

      if (!context2d) {
        emitUnavailable('Unavailable 2d context in canvas')
        return EMPTY
      }

      canvas.width = SIZE
      canvas.height = SIZE

      return fromEvent(video, 'loadedmetadata').pipe(
        switchMap(() => from(video.play())),
        switchMap(() => everyUpdated$.pipe(
          tap(() => {
            context2d.drawImage(video, 0, 0, SIZE, SIZE)
            const screenShot = context2d.getImageData(0, 0, SIZE, SIZE)
            const capture = screenShot.data
            emitCapture(capture)
          }),
          catchError(() => {
            emitUnavailable('Error in media stream processing')
            return EMPTY
          }),
        ))
      )
    })
  ).subscribe()
}
