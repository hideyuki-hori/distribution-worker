import type { JSX } from 'solid-js/jsx-runtime'
import { css } from 'panda/css'
import { cm } from '~/lib/cm'
import type { WithClass } from '~/types/with-class'
import devTo from './dev-to.svg'
import github from './github.svg'
import zenn from './zenn.svg'

export function Info(p: WithClass) {
  return (
    <div class={cm(p.class, {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      px: '1rem',
      py: '0.5rem',
      background: 'zinc.50/10',
      backdropBlur: '2xl',
    })}>
      <h1 class={css({
        fontSize: 'xs',
        fontWeight: 'bold',
      })}>DISTRIBUTION WEB WORKER</h1>
      <div class={css({ flexGrow: 1 })} />
      <Link src={github} alt='github' href='https://github.com/hideyuki-hori/exp-distribution-web-worker' />
      <Link src={devTo} alt='github' href='https://dev.to/hideyuki_hori' class={css({ px: '0.5rem' })} />
      <Link src={zenn} alt='zenn' href='https://zenn.dev/hideyuki_hori' />
    </div>
  )
}

function Link(p: WithClass & {
  src: JSX.ImgHTMLAttributes<HTMLImageElement>['src'],
  alt: JSX.ImgHTMLAttributes<HTMLImageElement>['alt'],
  href: JSX.AnchorHTMLAttributes<HTMLAnchorElement>['href'],
}) {
  return (
    <a href={p.href} target='_blank' rel='noopener noreferrer' class={p.class}>
      <img src={p.src} alt={p.alt} class={css({
        width: '1.2rem',
        borderRadius: 'xs',
        objectFit: 'cover',
      })} />
    </a>
  )
}