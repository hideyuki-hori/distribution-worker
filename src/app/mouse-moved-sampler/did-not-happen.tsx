import { css } from 'panda/css'

export function DidNotHappen() {
  return (
    <div class={css({
      px: '1rem',
      py: '0.5rem',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'sm',
      background: 'zinc.50/10',
      backdropFilter: 'blur(10px)',
      fontSize: 'sm',
      fontWeight: 'bold',
      color: 'zinc.50',
    })}>
      did not happen...
    </div>
  )
}