import { render } from 'solid-js/web'
import { App } from '~/app'
import { fork } from '~/fork'
import '~/styles.css'

main()

function main() {
  const root = document.getElementById('root')
  if (!root) throw new Error()
  fork()
  render(() => <App />, root)
}