import { cm } from '~/lib/cm'
import { WithChildren } from '~/types/with-children'
import { WithClass } from '~/types/with-class'

export function Card(p: WithClass & WithChildren) {
  return (
    <div class={cm(p.class, {
      borderRadius: 'sm',
      borderColor: 'zinc.50/10',
      borderStyle: 'solid',
      borderWidth: '1px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '50%',
      minHeight: '30%',
      gap: '1rem',
      p: '1rem',
      color: 'zinc.50',
    })}>
      {p.children}
    </div>
  )
}