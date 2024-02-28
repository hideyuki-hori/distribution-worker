import { ApexOptions } from 'apexcharts'
import { token } from 'panda/tokens'

export const options: ApexOptions = {
  chart: {
    type: 'radialBar',
    width: 200,
    height: 200,
    offsetX: 0,
    offsetY: 0,
  },
  plotOptions: {

    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: token('colors.zinc.50'),
        margin: 0,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: 0,
          color: token('colors.zinc.50'),
        },
      }
    },
  },
  fill: {
    colors: [token('colors.violet.700')],
  },
  // labels: ['aaaaa'],
}