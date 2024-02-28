import { css } from 'panda/css'
import { Match, Switch, createSignal, onCleanup, onMount } from 'solid-js'
import { emitAccessRequested } from '~/$/camera'
import { denied$ } from './$'
import { Card } from './card'

export function NoSignal() {
  const [warn, setWarn] = createSignal(false)

  onMount(() => {
    const subscription = denied$.subscribe(() => setWarn(true))
    onCleanup(() => subscription.unsubscribe())
  })

  return (
    <Card>
      <button onClick={emitAccessRequested} class={css({
        px: '1rem',
        py: '0.5rem',
        borderRadius: 'sm',
        fontSize: 'sm',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'zinc.50/10',
        '&:hover': {
          background: 'zinc.50/10',
        },
      })}>Activate Camera</button>
      <div class={css({
        fontSize: 'xs',
        textAlign: 'center',
      })}>
        <Switch fallback={
          <>
            <p>After pressing this button, you will be prompted to grant access to your camera from the browser.</p>
            <p class={css({
              fontSize: 'sm',
              fontWeight: 'bold',
            })}>Please approve the request.</p>
          </>
        }>
          <Match when={warn()}>
            <p class={css({
              color: 'yellow.600',
              fontSize: 'sm',
              fontWeight: 'bold',
            })}>Access Denied.</p>
            <p class={css({
              color: 'yellow.600',
            })}>Please use your browser's settings to allow camera access from this page.</p>
            <p class={css({
              color: 'yellow.600',
              '&>span': {
                fontWeight: 'bold',
              },
            })}>Afterwards, please click the <span>'Activate Camera'</span> button again.</p>
          </Match>
        </Switch>
      </div>
    </Card>
  )
}
