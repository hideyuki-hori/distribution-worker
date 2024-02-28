import { calculate } from './calculate'
import { Payload } from './types'

self.addEventListener('message', (event: MessageEvent<Payload>) => {
  const { capture, size, height } = event.data
  const [vertices, colors] = calculate(capture, size, height)
  self.postMessage({
    vertices: vertices.buffer,
    colors: colors.buffer,
  }, [vertices.buffer, colors.buffer] as any)
})
