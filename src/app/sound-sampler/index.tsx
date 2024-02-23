import { css } from 'panda/css'
import Sample from './sample'

export function SoundSampler() {
  return (
    <div class={css({
      width: '100%',
      p: '1rem',
      borderRadius: 'sm',
      background: 'zinc.50/20',
      backdropFilter: 'blur(10px)',
    })}>
      <h2 class={css({
        fontSize: 'sm',
        fontWeight: 'bold',
        color: 'zinc.50',
      })}>Sound Sampler</h2>
      <Sample />
    </div>
  )
}