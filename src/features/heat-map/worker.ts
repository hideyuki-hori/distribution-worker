import { WorkerPayload } from '~/types/worker-payload'
import { calculate } from './calculate'

self.addEventListener('message', (event: MessageEvent<WorkerPayload>) => {
  const { capture, size, height } = event.data
  const [vertices, colors] = calculate(capture, size, height)
  self.postMessage({
    vertices: vertices.buffer,
    colors: colors.buffer,
  }, [vertices.buffer, colors.buffer] as any)
})
