import { css } from 'panda/css'

export function Camera() {
  return (
    <div class={css({
      background: 'zinc.50/10',
      borderRadius: 'sm',
      backdropFilter: 'blur(10px)',
    })}>
      camera
    </div>
  )
}