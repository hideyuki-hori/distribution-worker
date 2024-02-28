import { css } from 'panda/css'
import { For, Match, Switch, onCleanup, onMount } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import type { Notification as Props } from '~/types/notification'
import { Failed, Info, Succeed, Warning } from './card'
import { $ } from './$'

export function Notification() {
  const [notifications, setNotifications] = createStore<Props[]>([])

  onMount(() => {
    const subscription = $.subscribe(notification => {
      setNotifications(produce(draft => {
        draft.unshift(notification)
        draft.length > 30 && draft.pop()
      }))
    })
    onCleanup(() => {
      subscription.unsubscribe()
    })
  })

  return (
    <div class={css({
      width: '100%',
      height: '100%',
      overflow: 'auto',
      '&>*:not(:last-child)': {
        mb: '0.5rem',
      },
    })}>
      <For each={notifications}>
        {p => (
          <Switch>
            <Match when={p.kind === 'info'}><Info {...p} /></Match>
            <Match when={p.kind === 'succeed'}><Succeed {...p} /></Match>
            <Match when={p.kind === 'failed'}><Failed {...p} /></Match>
            <Match when={p.kind === 'warning'}><Warning {...p} /></Match>
          </Switch>
        )}
      </For>
    </div>
  )
}
