import { css } from 'panda/css'
import { HeatMap } from './features/heat-map'
import { MouseMovementSampler } from './features/mouse-movement-sampler'
import { Info } from './features/info'

export function App() {
  return (
    <main class={css({
      width: 'full',
      height: 'full',
    })}>
      <div class={css({
        position: 'absolute',
        zIndex: 100,
        color: 'white',
        width: '100%',
      })}>
        <MouseMovementSampler />
        <Info class={css({
          position: 'fixed',
          bottom: '0',
        })} />
      </div>
      <HeatMap />
    </main>
  )
}