import { css } from 'panda/css'
import { Card } from './card'

export function Requesting() {
  return (
    <Card>
      <p class={css({
        fontSize: 'sm',
        fontWeight: 'bold',
        lineHeight: 1,
        color: 'zinc.50',
        animation: 'ping',
      })}>REQUESTING...</p>
    </Card>
  )
}