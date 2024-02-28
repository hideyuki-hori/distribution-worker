import { css } from 'panda/css'
import { render } from 'solid-js/web'
import { Background } from '~/features/background'
import { Interaction } from '~/features/interaction'
import { Header } from '~/features/header'
import { MousePressedIndicator } from '~/features/mouse-pressed-indicator'
import { MouseMovedSampler } from '~/features/mouse-moved-sampler'
import { Notification } from '~/features/notification'
import { renderHeatMap } from '~/features/heat-map/render-heat-map'
import { watchAccessRequested } from '~/features/camera/watch-access-requested'
import { watchMediaStreamCreated } from '~/features/camera/watch-media-stream-created'
import '~/globals.css'

export const VIDEO_CAPTURE_SIZE = 512

const root = document.getElementById('root')
if (!root) throw new Error()

watchAccessRequested()
watchMediaStreamCreated()
renderHeatMap()

render(() => (
  <main class={css({
    width: 'full',
    height: 'full',
  })}>
    <div class={css({
      position: 'absolute',
      zIndex: 100,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
    })}>
      <div class={css({
        minWidth: '4xl',
        width: '7xl',
        height: '100%',
        maxWidth: '7xl',
      })}>
        <div class={css({
          position: 'relative',
          width: '100%',
          height: '100%',
        })}>
          <Header />
          <div class={css({
            display: 'grid',
            gridTemplateColumns: '280px 1fr 300px',
            height: 'calc(100vh - 2rem)',
            pt: '1rem',
            pb: '1rem',
            overflow: 'hidden',
          })}>
            <div class={css({
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: '1rem',
              overflow: 'hidden',
            })}>
              <MousePressedIndicator />
              <MouseMovedSampler />
            </div>
            <div class={css({
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            })}>
              <Interaction />
            </div>
            <div class={css({
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            })}>
              <Notification />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Background />
  </main>
), root)
