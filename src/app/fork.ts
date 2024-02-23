import { task as heatMap } from './heat-map/task'
import { watchAccessRequested } from './camera/watch-access-requested'
import { watchMediaSteamCreated } from './camera/watch-media-sream-created'

export function fork() {
  watchAccessRequested()
  watchMediaSteamCreated()
  heatMap()
}
