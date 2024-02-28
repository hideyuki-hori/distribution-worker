import { createSignal, onMount } from 'solid-js'
import { css } from 'panda/css'
import { emitCanvasMounted } from '~/$/background'

export function Background() {
  const [canvas, setCanvas] = createSignal<HTMLCanvasElement>()

  onMount(() => {
    const ref = canvas()
    !!ref && emitCanvasMounted(ref)
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
