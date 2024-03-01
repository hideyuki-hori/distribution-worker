import { css } from 'panda/css'
import { Social } from './social'
import { GitHub } from './icons/git-hub'
import { DevTo } from './icons/dev-to'
import { Zenn } from './icons/zenn'

export function Header() {
  return (
    <header class={css({
      width: '100%',
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
      <div class={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
      })}>
        <Social
          href='https://github.com/hideyuki-hori/distribution-worker'
          Icon={GitHub}
          width='22px'
          height='22px'
        />
        <Social
          href='https://dev.to/hideyuki_hori'
          Icon={DevTo}
          width='20px'
          height='20px'
        />
        <Social
          href='https://zenn.dev/hideyuki_hori/articles/3823e2cf589fd1'
          Icon={Zenn}
          width='20px'
          height='20px'
        />
      </div>
    </header>
  )
}