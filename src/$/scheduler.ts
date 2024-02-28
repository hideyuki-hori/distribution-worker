import { Observable } from 'rxjs'

export const everyUpdated$ = new Observable<number>(observer => {
  const schedule = () => {
    observer.next(performance.now())
    requestAnimationFrame(schedule)
  }
  schedule()
})
