import type { PropertyValue } from 'panda/types/prop-type'
import { cm } from '~/lib/cm'
import type { WithChildren } from '~/types/with-children'
import type { WithClass } from '~/types/with-class'

export function Table(p: WithChildren & WithClass) {
  return (
    <table class={cm(p.class, {
      width: '100%',
    })}>
      {p.children}
    </table>
  )
}

export function Tr(p: WithChildren & WithClass & {
  pointer?: boolean
}) {
  return (
    <tr class={cm(p.class, {
      cursor: p.pointer ? 'pointer' : undefined,
    })}>
      {p.children}
    </tr>
  )
}

export function Th(p: WithChildren & WithClass & {
  width?: PropertyValue<'width'>
  align: PropertyValue<'textAlign'>
}) {
  return (
    <th class={cm(p.class, {
      width: p.width,
      textAlign: p.align,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    })}>{p.children}</th>
  )
}

export function Td(p: WithChildren & WithClass & {
  width?: PropertyValue<'width'>
  align: PropertyValue<'textAlign'>
}) {
  return (
    <td class={cm(p.class, {
      width: p.width,
      textAlign: p.align,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    })}>{p.children}</td>
  )
}