import { render } from 'solid-js/web'
import { App } from '~/app'
import '~/styles.css'

main()

function main() {
  const root = document.getElementById('root')
  if (!root) throw new Error()
  render(() => <App />, root)
}