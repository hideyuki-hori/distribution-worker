import { createSignal } from 'solid-js'
import { css } from 'panda/css'
import { Camera, DevTo, GitHub, Microphone, Zenn } from './icons'

export function Header() {
  const [microphoneEnabled, setMicrophoneEnabled] = createSignal(false)
  return (
    <header class={css({
      position: 'absolute',
      zIndex: 100,
      width:'100%',
      py: '0.5rem',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'zinc.50/10',
      backdropFilter: 'blur(10px)',
    })}>
      <h1 class={css({
        lineHeight: 1,
        fontSize: 'sm',
        fontWeight: 'bold',
        color: 'zinc.50',
      })}>DISTRIBUTION WORKER</h1>
      <div class={css({ flexGrow: 1 })} />
      <button
        onClick={() => {
          setMicrophoneEnabled(prev => !prev)
        }}
        class={css({
          cursor: 'pointer',
          px: '1rem',
          py: '0.2rem',
          background: 'zinc.50/10',
          borderRadius: '2xl',
          color: 'zinc.50',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'zinc.50/10',
        })}
      >
        <Microphone class={css({
          display: 'inline',
          width: '14px',
          height: '14px',
          mr: '0.2rem',
        })} />
        <span class={css({
          fontSize: 'xs',
          fontWeight: 'bold',
        })}>Microphone {microphoneEnabled() ? 'Enabled' : 'Disabled'}</span>
      </button>
      <button class={css({
        cursor: 'pointer',
        px: '1rem',
        py: '0.2rem',
        background: 'zinc.50/10',
        borderRadius: '2xl',
        color: 'zinc.50',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'zinc.50/10',
        ml: '0.5rem',
        mr: '2rem',
        verticalAlign: 'middle',
      })}>
        <Camera class={css({
          display: 'inline',
          width: '14px',
          height: '14px',
          mr: '0.3rem',
          lineHeight: 1,
        })} />
        <span class={css({
          fontSize: 'xs',
          fontWeight: 'bold',
          lineHeight: 1,
        })}>Camera Enabled</span>
      </button>
      <a
        href='https://github.com/hideyuki-hori/exp-distribution-web-worker'
        target='_blank'
        rel='noopener noreferrer'
      >
        <GitHub class={css({
          width: '22px',
          height: '22px',
          color: 'zinc.50',
        })} />
      </a>
      <a
        href='https://dev.to/hideyuki_hori'
        target='_blank'
        rel='noopener noreferrer'
        class={css({
          mx: '0.5rem',
        })}
      >
        <DevTo class={css({
          width: '20px',
          height: '20px',
          color: 'zinc.50',
        })} />
      </a>
      <a
        href='https://zenn.dev/hideyuki_hori'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Zenn class={css({
          width: '20px',
          height: '20px',
          color: 'zinc.50',
        })} />
      </a>

    </header>
  )
}