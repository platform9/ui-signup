import { ViewPanes } from './constants'
import { IUser } from './context'
import browserHistory from './history'

const baseUrl = process.env.BUILD_TARGET === 'production' ? '/' : 'http://localhost:3000/'

export const navigate = (pane: ViewPanes, path = window.location.pathname) => {
  browserHistory.push({ route: `${path}?view=${pane}` })
}

export const createEmbarkUser = async (user: IUser) => {
  fetch(`${baseUrl}/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw new Error(res.error)
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
