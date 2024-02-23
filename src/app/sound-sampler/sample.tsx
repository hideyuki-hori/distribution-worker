import { token } from 'panda/tokens'
import { SolidApexCharts } from 'solid-apexcharts'
import { createSignal, onCleanup, onMount } from 'solid-js'

export default function () {
  const [series, setSeries] = createSignal([
    { name: 'Series 1', data: generateInitialData() },
    { name: 'Series 2', data: generateInitialData() },
  ])

  function generateInitialData() {
    const data = []
    for (let i = 0; i < 2; i++) {
      data.push({ x: new Date().getTime() - (10 - i) * 1000, y: Math.floor(Math.random() * 100) })
    }
    return data
  }

  function updateData() {
    setSeries(series => {
      const newData1 = series[0].data.concat()
      newData1.push({ x: new Date().getTime(), y: Math.floor(Math.random() * 100) })
      if (newData1.length > 10) {
        newData1.shift()
      }
      const newData2 = series[1].data.concat()
      newData2.push({ x: new Date().getTime(), y: Math.floor(Math.random() * 100) })
      if (newData2.length > 10) {
        newData2.shift()
      }
      return [
        { name: 'Series 1', data: newData1 },
        { name: 'Series 2', data: newData2 },
      ]
    })
  }

  onMount(() => {
    const interval = setInterval(updateData, 2000)
    onCleanup(() => clearInterval(interval))
  })

  return (
    <SolidApexCharts
      type='area'
      options={{
        chart: {
          type: 'area',
          height: 200,
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            },
          },
          toolbar: {
            show: false,
          },
          sparkline: {
            enabled: true,
          },
        },
        grid: {
          show: false,
          padding: {
            bottom: 0,
          }
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
          min: 0,
        },
        stroke: {
          curve: 'smooth',
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        colors: [
          token('colors.rose.400'),
          token('colors.indigo.400'),
        ],
        fill: {
          colors: [
            token('colors.rose.400'),
            token('colors.indigo.400'),
          ],
        }
      }}
      series={series()}
    />
  )
}

