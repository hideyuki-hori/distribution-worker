import { css } from 'panda/css'
import { HeatMap } from './heat-map'
import { Header } from './header'
import { MousePressedIndicator } from './mouse-pressed-indicator'
import { fork } from './fork'
import { MouseMovedSampler } from './mouse-moved-sampler'
import { Notification } from './notification'
import { SoundSampler } from './sound-sampler'

export function App() {
  fork()
  return (
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
          overflow: 'hidden',
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
              gridTemplateRows: 'auto',
              height: '100%',
              pt: '4rem',
              pb: '1rem',
            })}>
              <div class={css({
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
                height: '100%',
                mx: '1rem',
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
              })}>
                <SoundSampler />
              </div>
              <Notification />
            </div>
          </div>
        </div>
      </div>
      <HeatMap />
    </main>
  )
}