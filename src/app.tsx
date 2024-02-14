import { css } from 'panda/css'
import { HeatMap } from './features/heat-map'
import { MouseMovementSampler } from './features/mouse-movement-sampler'

export function App() {
  return (
    <main class={css({
      width: 'full',
      height: 'full',
    })}>
      <div class={css({
        position: 'absolute',
        zIndex: 100,
        color: 'white'
      })}>
        <MouseMovementSampler />
      </div>
      <HeatMap />
    </main>
  )
}