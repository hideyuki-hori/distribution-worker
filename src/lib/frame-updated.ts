import { interval, animationFrameScheduler, Observable } from 'rxjs'
import { filter, map, scan } from 'rxjs/operators'

const base$: Observable<number> = interval(0, animationFrameScheduler)

const createFrameRateStream$ = (fps: number) => {
  const duration = 1000 / fps
  const seed = {
    lastTime: performance.now(),
    delta: 0,
    shouldEmit: false,
  }

  return base$.pipe(
    scan((previous, current) => {
      const delta = current - previous.lastTime
      const shouldEmit = delta >= duration
      return {
        lastTime: shouldEmit ? current : previous.lastTime,
        delta,
        shouldEmit,
      }
    }, seed),
    filter(acc => acc.shouldEmit),
    map(acc => acc.lastTime),
  )
}

export const at1$ = createFrameRateStream$(1)
export const at30$ = createFrameRateStream$(30)
export const at60$ = createFrameRateStream$(60)
