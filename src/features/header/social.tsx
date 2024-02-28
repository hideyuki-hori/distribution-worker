import { css } from 'panda/css'
import { PropertyValue } from 'panda/types/prop-type'
import { Component } from 'solid-js'
import { WithClass } from '~/types/with-class'

export function Social({ Icon, ...p }: {
  href: string
  width: PropertyValue<'width'>
  height: PropertyValue<'width'>
  Icon: Component<WithClass>
}) {
  return (
    <a
      href={p.href}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Icon class={css({
        color: 'zinc.50',
        width: p.width,
        height: p.height,
      })} />
    </a>
  )
}