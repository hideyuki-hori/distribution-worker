import { firstValueFrom } from 'rxjs'
import { Renderer } from './renderer'
import { canvasMounted$ } from '~/$/heat-map'
import { resized$ } from '~/$/window'
import { captured$ } from '~/$/camera'

export async function task() {
  const canvas = await firstValueFrom(canvasMounted$)
  const renderer = new Renderer(canvas, window.innerWidth, window.innerHeight)

  resized$.subscribe(({ width, height }) => renderer.resize(width, height))
  captured$.subscribe(capture => renderer.render(capture))
}
