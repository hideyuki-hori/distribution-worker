import { css } from 'panda/css'
import type { Notification as Props } from '~/types/notification'
import { Failed, Info, Succeed, Warning } from './card'
import { createStore, produce } from 'solid-js/store'
import { For, onCleanup } from 'solid-js'
import { $ } from './$'

export function Notification() {
  const [notifications, setNotifications] = createStore<Props[]>([])

  const subscription = $.subscribe(notification => {
    setNotifications(produce(draft => {
      draft.unshift(notification)
      draft.length > 30 && draft.pop()
    }))
  })
  onCleanup(() => {
    subscription.unsubscribe()
  })

  return (
    <div class={css({
      width: '100%',
      overflow: 'auto',
      '&>*:not(:last-child)': {
        mb: '0.5rem',
      },
    })}>
      <For each={notifications}>
        {p => <Card {...p} />}
      </For>
    </div>
  )
}

function Card(p: Props) {
  switch (p.kind) {
    case 'info': return <Info {...p} />
    case 'succeed': return <Succeed {...p} />
    case 'failed': return <Failed {...p} />
    case 'warning': return <Warning {...p} />
  }
}