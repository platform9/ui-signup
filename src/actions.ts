import { ViewPanes } from './constants'
import browserHistory from './history'

export const navigate = (
  pane: ViewPanes,
  path = window.location.pathname
) => {
  browserHistory.push({ route: `${path}?view=${pane}` })
}
