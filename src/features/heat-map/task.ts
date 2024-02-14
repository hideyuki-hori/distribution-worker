import { firstValueFrom } from 'rxjs'
import { at60$ } from '~/lib/frame-updated'
import { SIZE } from './constants'
import { Renderer } from './renderer'
import { canvasMounted$ } from './$'

export async function task() {
  const canvas = await firstValueFrom(canvasMounted$)

  const video = document.createElement('video')
  video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true })
  const capture = document.createElement('canvas')
  capture.width = SIZE
  capture.height = SIZE
  const context2d = capture.getContext('2d', { willReadFrequently: true })!

  const renderer = new Renderer(canvas, window.innerWidth, window.innerHeight)

  video.addEventListener('loadedmetadata', async () => {
    await video.play()
    at60$.subscribe(_ => {
      context2d.drawImage(video, 0, 0, capture.width, capture.height)
      const screenShot = context2d.getImageData(0, 0, capture.width, capture.height)
      const data = screenShot.data
      renderer.render(data)
    })
  })
}
