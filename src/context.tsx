import React from 'react'
import { ViewPanes, DeployTargets } from './constants'

export interface IAppState {
  showUnsureModal?: boolean
  activePane?: ViewPanes
  deployTarget?: DeployTargets
}

export interface IAppContext extends IAppState {
  setContextValue: (payload: Pick<IAppState, keyof IAppState>) => void
}

export type PropsWithContext<T> = IAppContext & T

export const AppContext = React.createContext({})

export const withAppContext = (Component) => (props) =>
  <AppContext.Consumer>{(ctx) => <Component {...props} {...ctx} />}</AppContext.Consumer>
