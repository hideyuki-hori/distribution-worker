import { css, cx } from 'panda/css'
import { SystemStyleObject } from 'panda/types'

/**
 * [c]ss [m]erge
 * @param cls
 * @param style
 * @returns
 */
export function cm(cls: string | undefined, style: SystemStyleObject) {
  return cx(cls, css(style))
}
