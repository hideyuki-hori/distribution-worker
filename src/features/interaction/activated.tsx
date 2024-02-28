import { css } from 'panda/css'
import { Match, Switch, createSignal, onCleanup, onMount } from 'solid-js'
import { actual$ } from './$'
import { Card } from './card'
import { CalculationProcessLocation } from '~/types/calculation-process-location'
import { emitCalculationProcessLocationUpdated } from '~/$/interaction'

export function Activated() {
  const [fps, setFps] = createSignal(0)
  const [location, setLocation] = createSignal<CalculationProcessLocation>('MainThread')

  const toggleLocation = () => {
    setLocation(prev => {
      const next = prev === 'MainThread' ? 'WebWorker' : 'MainThread'
      emitCalculationProcessLocationUpdated(next)
      return next
    })
  }

  onMount(() => {
    const subscription = actual$.subscribe(setFps)
    onCleanup(() => subscription.unsubscribe())
  })

  return (
    <Card class={css({
      textAlign: 'center',
      '&:hover': {
        background: 'zinc.50/10',
        backdropFilter: 'blur(10px)',
      },
      '&:not(:hover)': {
        filter: 'blur(1.3px)',
      },
    })}>
      <div class={css({
        fontWeight: 'bold',
        textAlign: 'center',
      })}>
        <span class={css({
          fontSize: '4xl',
          mr: '0.3rem',
        })}>{fps().toFixed(0)}</span>
        <span class={css({
          fontSize: 'lg',
        })}>FPS</span>
      </div>
      <div class={css({
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
      })}>
        <div>
          <p class={css({
            fontSize: 'xs',
            verticalAlign: 'middle',
          })}>
            Current Calculation Process running on
          </p>
          <p class={css({
            fontWeight: 'bold',
            fontSize: 'sm',
          })}>
            <Switch fallback='Web Worker'>
              <Match when={location() === 'MainThread'}>
                Main Thread
              </Match>
            </Switch>
          </p>
        </div>
        <Switch fallback={
          <button onClick={toggleLocation} class={css({
            px: '1rem',
            py: '0.5rem',
            borderRadius: 'sm',
            fontSize: 'xs',
            color: 'blue.600',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'blue.500/30',
            '&:hover': {
              background: 'blue.500/30',
            },
          })}>Switch to Main Thread</button>
        }>
          <Match when={location() === 'MainThread'}>
            <button onClick={toggleLocation} class={css({
              px: '1rem',
              py: '0.5rem',
              borderRadius: 'sm',
              fontSize: 'xs',
              color: 'rose.600',
              fontWeight: 'bold',
              cursor: 'pointer',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rose.500/30',
              '&:hover': {
                background: 'rose.500/30',
              },
            })}>Switch to Web Worker</button>
          </Match>
        </Switch>
      </div>
    </Card >
  )
}