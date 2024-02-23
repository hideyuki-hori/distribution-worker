import { css } from 'panda/css'
import { createStore, produce } from 'solid-js/store'
import { Movement } from './types'
import { $ } from './$'
import { For, onCleanup } from 'solid-js'
import { Row } from './row'
import { DidNotHappen } from './did-not-happen'

export function MouseMovedSampler() {
  const [movements, setMovements] = createStore<Movement[]>([])

  const subscription = $.subscribe(movement => {
    setMovements(produce(draft => {
      draft.unshift(movement)
      draft.length > 50 && draft.pop()
    }))
  })

  onCleanup(() => {
    subscription.unsubscribe()
  })

  return (
    <div class={css({
      width: '100%',
      height: '100%',
    })}>
      <h2 class={css({
        fontSize: 'sm',
        fontWeight: 'bold',
        color: 'zinc.50',
        textAlign: 'center',
        width: '100%',
        mb: '0.5rem',
      })}>Mouse Moved Sampler(at 1s)</h2>
      <div class={css({
        height: '100%',
        overflow: 'auto',
        '&>div:not(:last-child)': {
          mb: '0.5rem',
        },
      })}>
        <For each={movements}>
          {movement => (
            movement.occurred > 0
              ? <Row {...movement} />
              : <DidNotHappen />
          )}
        </For>
      </div>
    </div>
  )
}
