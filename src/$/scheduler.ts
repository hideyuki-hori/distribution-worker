import { Observable } from 'rxjs'

export const everyUpdated$ = new Observable<number>(observer => {
  let lastFrameTime = performance.now()

  const schedule = () => {
    const now = performance.now()
    const delta = now - lastFrameTime
    const fps = 1000 / delta
    observer.next(fps)

    lastFrameTime = now
    requestAnimationFrame(schedule)
  }

  schedule()
})
