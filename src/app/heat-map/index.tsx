import { createSignal, onMount } from 'solid-js'
import { css } from 'panda/css'
import { notifyCanvasMounted } from '~/$/heat-map'
import { ready$ } from './ready$'

export function HeatMap() {
  const [get, set] = createSignal<HTMLCanvasElement>()
  const [ready, setReady] = createSignal(false)
  onMount(() => {
    const canvas = get()
    !!canvas && notifyCanvasMounted(canvas)
    const s = ready$.subscribe(() => {
      setReady(true)
      s.unsubscribe()
      console.log('ok')
    })
  })
  return (
    <div class={css({
      position: 'absolute',
      width: '100%',
      height: '100%',
    })}>
      {ready() && <div class={css({
        position: 'absolute',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        background: 'zinc.50/10',
      })}>
        <p class={css({
          fontSize: '2xl',
          fontWeight: 'bold',
          color: 'zinc.50',
        })}>No Signal...</p>
      </div>}
      <canvas
        ref={set}
        class={css({
          position: 'relative',
          zIndex: 0,
        })}
      />
    </div>
  )
}
