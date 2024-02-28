import { Match, Switch, onCleanup, onMount, createSignal } from 'solid-js'
import { CameraStatus } from '~/types/camera-status'
import { NoSignal } from './no-signal'
import { Requesting } from './requesting'
import { $ } from './$'
import { Activated } from './activated'

export function Interaction() {
  const [status, setStatus] = createSignal<CameraStatus>('no signal')

  onMount(() => {
    const subscription = $.subscribe(setStatus)
    onCleanup(() => subscription.unsubscribe())
  })

  return (
    <Switch>
      <Match when={status() === 'no signal'}><NoSignal /></Match>
      <Match when={status() === 'requesting'}><Requesting /></Match>
      <Match when={status() === 'activated'}><Activated /></Match>
    </Switch>
  )
}