import { render } from 'solid-js/web'
import { App } from '~/app'
import '~/globals.css'
import { emitAccessRequested } from './$/camera'

main()

function main() {
  const root = document.getElementById('root')
  if (!root) throw new Error()
  render(() => <App />, root)
  emitAccessRequested()
}
