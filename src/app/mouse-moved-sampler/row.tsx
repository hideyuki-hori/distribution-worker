import { css } from 'panda/css'
import { Movement } from './types'

export function Row({ occurred, amount, x, y }: Movement) {
  return (
    <div class={css({
      px: '1rem',
      py: '0.5rem',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 'sm',
      background: 'linear-gradient(to right, rgba(250, 250, 250, 0.1), rgba(250, 250, 250, 0.2))',
      backdropFilter: 'blur(10px)',
    })}>
      <div class={css({
        textAlign: 'left',
      })}>
        <div class={css({
          fontSize: 'xl',
          color: 'zinc.50',
          fontWeight: 'bold',
          lineHeight: 1,
        })}>{occurred}</div>
        <div class={css({
          fontSize: 'xs',
          color: 'zinc.50',
          fontWeight: 'bold',
          lineHeight: 1,
        })}>Occurred</div>
      </div>
      <p class={css({
        color: 'zinc.50',
        lineHeight: 1,
        fontSize: 'xs',
        fontWeight: 'bold',
      })}>{Math.round(amount).toLocaleString()}(x: {x}, y: {y})</p>
    </div>
  )
}