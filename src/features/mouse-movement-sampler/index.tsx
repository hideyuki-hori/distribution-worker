import { For, createEffect, createSignal } from 'solid-js'
import { Movement } from './types'
import { mouseMove$ } from './$'
import { css } from 'panda/css'
import { Table, Td, Th, Tr } from '~/components/table'

export function MouseMovementSampler() {
  const [movements, setMovements] = createSignal<Movement[]>([])
  createEffect(() => {
    const subscription = mouseMove$.subscribe(movement => {
      setMovements(current => {
        const next = [movement, ...current]
        if (next.length > 20) next.pop()
        return next
      })
    })
    return () => subscription.unsubscribe()
  })

  return (
    <div class={css({
      background: 'zinc.50/10',
      px: '1rem',
      py: '0.5rem',
      fontSize: 'xs',
      borderRadius: 'xs',
    })}>
      <h2 class={css({
        fontWeight: 'bold',
      })}>Mouse Movement Sampling</h2>
      <Table>
        <thead>
          <Tr class={css({
            fontWeight: 'bold',
          })}>
            <Th width='25%' align='left'>Events</Th>
            <Th width='25%' align='right'>X</Th>
            <Th width='25%' align='right'>Y</Th>
            <Th width='25%' align='right'>Total</Th>
          </Tr>
        </thead>
        <tbody>
          <For each={movements()}>
            {movement => (
              <Tr pointer>
                <Td align='left'>{movement.count}</Td>
                <Td align='right'>{movement.x}</Td>
                <Td align='right'>{movement.y}</Td>
                <Td align='right'>{movement.total.toFixed(2)}</Td>
              </Tr>
            )}
          </For>
        </tbody>
      </Table>
    </div>
  )
}

