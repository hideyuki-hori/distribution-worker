import { firstValueFrom } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import { canvasMounted$ } from '~/$/background'
import { resized$ } from '~/$/window'
import { captured$ } from '~/$/camera'
import { calculationProcessLocationUpdated$ } from '~/$/interaction'
import { Renderer } from './renderer'
import { VIDEO_CAPTURE_SIZE as size } from '~/app'
import { Payload, Result } from './types'
import { calculate } from './calculate'

export async function renderHeatMap() {
  const canvas = await firstValueFrom(canvasMounted$)
  const renderer = new Renderer(canvas, window.innerWidth, window.innerHeight)
  const url = new URL('./worker.ts', import.meta.url)
  const worker = new Worker(url, { type: 'module' })

  resized$.subscribe(({ width, height }) => renderer.resize(width, height))

  calculationProcessLocationUpdated$.pipe(
    switchMap(location => location === 'WebWorker'
      ? captured$.pipe(
        tap(capture => {
          const payload: Payload = {
            capture,
            size,
            height: window.innerHeight,
          }
          worker.postMessage(payload)
        }),
      )
      : captured$.pipe(
        map(capture => calculate(capture, size, window.innerHeight)),
        tap(([vertices, colors]) => renderer.render(vertices, colors)),
      )
    )
  ).subscribe()

  worker.addEventListener('message', (event: MessageEvent<Result>) => {
    const { vertices, colors } = event.data
    renderer.render(vertices, colors)
  })
}
