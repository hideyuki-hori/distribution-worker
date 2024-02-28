import { createSignal, onCleanup } from 'solid-js'
import { css } from 'panda/css'
import { SolidApexCharts } from 'solid-apexcharts'
import { options } from './options'
import { $ } from './$'

export function MousePressedIndicator() {
  const [percentage, setPercentage] = createSignal(0)
  const subscription = $.subscribe(setPercentage)

  onCleanup(() => {
    subscription.unsubscribe()
  })

  return (
    <div class={css({
      background: 'zinc.50/10',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: 'sm',
      py: '1rem',
    })}>
      <h2 class={css({
        fontSize: 'sm',
        fontWeight: 'bold',
        color: 'zinc.50',
      })}>
        Mouse Pressed Indicator
      </h2>
      <div class={css({
        height: '100px',
      })}>
        <SolidApexCharts
          type='radialBar'
          options={options}
          series={[percentage()]}
        />
      </div>
    </div>
  )
}