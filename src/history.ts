import { createBrowserHistory } from 'history'

export type HistoryListenCallback = (route, action) => void

export interface IHistoryChangePayload {
  state?: any
  route?: string
}

const privateHistoryProperty = Symbol('history')
const privateListenerProperty = Symbol('listenerStore')

class History {
  private [privateHistoryProperty]
  private [privateListenerProperty]: HistoryListenCallback[] = []

  get history() {
    return this[privateHistoryProperty]
  }

  constructor() {
    this[privateHistoryProperty] = createBrowserHistory()
    this[privateHistoryProperty].listen(this.dispatchChangeOnCb)
  }

  public push({ state = {}, route = '' }: IHistoryChangePayload) {
    this.history.push(route, state)
  }
  public replace({ state = {}, route = '' }: IHistoryChangePayload) {
    this.history.replace(route, state)
  }

  private dispatchChangeOnCb = (route, action) => {
    this[privateListenerProperty].forEach((callback) => {
      callback(route, action)
    })
  }

  public onChange = (cb: HistoryListenCallback) => this[privateListenerProperty].push(cb)
}

const browserHistory = new History()
export default browserHistory