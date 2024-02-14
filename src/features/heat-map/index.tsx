import { createSignal, onMount } from 'solid-js'
import { css } from 'panda/css'
import { notifyCanvasMounted } from './$'

export function HeatMap() {
  const [canvas, setCanvas] = createSignal<HTMLCanvasElement>()
  onMount(() => {
    const snapshot = canvas()
    !!snapshot && notifyCanvasMounted(snapshot)
  })
  return (
    <canvas
      ref={setCanvas}
      class={css({
        position: 'relative',
        zIndex: 0,
      })}
    />
  )
}
