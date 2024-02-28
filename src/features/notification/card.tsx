import { css } from 'panda/css'
import { Notification } from '~/types/notification'
import { FailedIcon, InfoIcon, SucceedIcon, WarningIcon } from './icons'

export function Info(p: Notification) {
  return (
    <div class={css({
      width: '100%',
      background: 'zinc.50/20',
      borderRadius: 'sm',
      px: '0.5rem',
      py: '0.3rem',
      backdropFilter: 'blur(10px)',
    })}>
      <div class={css({
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.5rem',
      })}>
        <InfoIcon class={css({
          width: '20px',
          height: '20px',
          color: 'zinc.50',
        })} />
        <span class={css({
          fontSize: 'sm',
          fontWeight: 'bold',
          color: 'zinc.50',
        })}>{p.title}</span>
      </div>
      {p.description && <p class={css({
        mt: '0.2rem',
        color: 'zinc.50',
        fontSize: 'xs',
      })}>{p.description}</p>}
      <div class={css({
        width: '100%',
        textAlign: 'right',
        lineHeight: 1,
      })}>
        <span class={css({
          fontSize: 'xs',
          color: 'zinc.50',
        })}>{format(p.at)}</span>
      </div>
    </div>
  )
}

export function Succeed(p: Notification) {
  return (
    <div class={css({
      width: '100%',
      background: 'emerald.700/20',
      borderRadius: 'sm',
      px: '0.5rem',
      py: '0.3rem',
      backdropFilter: 'blur(10px)',
    })}>
      <div class={css({
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.5rem',
      })}>
        <SucceedIcon class={css({
          width: '20px',
          height: '20px',
          color: 'emerald.700',
        })} />
        <span class={css({
          fontSize: 'sm',
          fontWeight: 'bold',
          color: 'zinc.50',
        })}>{p.title}</span>
      </div>
      {p.description && <p class={css({
        mt: '0.2rem',
        color: 'zinc.50',
        fontSize: 'xs',
      })}>{p.description}</p>}
      <div class={css({
        width: '100%',
        textAlign: 'right',
        lineHeight: 1,
      })}>
        <span class={css({
          fontSize: 'xs',
          color: 'zinc.50',
        })}>{format(p.at)}</span>
      </div>
    </div>
  )
}

export function Failed(p: Notification) {
  return (
    <div class={css({
      width: '100%',
      background: 'rose.800/20',
      borderRadius: 'sm',
      px: '0.5rem',
      py: '0.3rem',
      backdropFilter: 'blur(10px)',
    })}>
      <div class={css({
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.5rem',
      })}>
        <FailedIcon class={css({
          width: '20px',
          height: '20px',
          color: 'rose.800',
        })} />
        <span class={css({
          fontSize: 'sm',
          fontWeight: 'bold',
          color: 'zinc.50',
        })}>{p.title}</span>
      </div>
      {p.description && <p class={css({
        mt: '0.2rem',
        color: 'zinc.50',
        fontSize: 'xs',
      })}>{p.description}</p>}
      <div class={css({
        width: '100%',
        textAlign: 'right',
        lineHeight: 1,
      })}>
        <span class={css({
          fontSize: 'xs',
          color: 'zinc.50',
        })}>{format(p.at)}</span>
      </div>
    </div>
  )
}

export function Warning(p: Notification) {
  return (
    <div class={css({
      width: '100%',
      background: 'yellow.600/20',
      borderRadius: 'sm',
      px: '0.5rem',
      py: '0.3rem',
      backdropFilter: 'blur(10px)',
    })}>
      <div class={css({
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.5rem',
      })}>
        <WarningIcon class={css({
          width: '20px',
          height: '20px',
          color: 'yellow.600',
        })} />
        <span class={css({
          fontSize: 'sm',
          fontWeight: 'bold',
          color: 'zinc.50',
        })}>{p.title}</span>
      </div>
      {p.description && <p class={css({
        mt: '0.2rem',
        color: 'zinc.50',
        fontSize: 'sm',
      })}>{p.description}</p>}
      <div class={css({
        width: '100%',
        textAlign: 'right',
        lineHeight: 1,
      })}>
        <span class={css({
          fontSize: 'xs',
          color: 'zinc.50',
        })}>{format(p.at)}</span>
      </div>
    </div>
  )
}

function format(date: Date) {
  const y = date.getFullYear()
  const m = p2(date.getMonth() + 1)
  const d = p2(date.getDate())
  const h = p2(date.getHours())
  const mi = p2(date.getMinutes())
  const s = p2(date.getSeconds())
  return `${y}/${m}/${d} ${h}:${mi}:${s}`
}

function p2(n: number) {
  return n.toString().padStart(2, '0')
}