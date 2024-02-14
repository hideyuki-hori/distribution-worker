import { css } from 'panda/css'
import { HeatMap } from './features/heat-map'

export function App() {
  return (
    <main class={css({
      width: 'full',
      height: 'full',
    })}>
      <HeatMap />
    </main>
  )
}