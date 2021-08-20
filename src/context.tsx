import React from 'react'
import { ViewPanes, DeployTargets } from './constants'

export interface IUser {
  firstName?: string
  lastName?: string
  organizationName?: string
  organizationEmail?: string
}
export interface IAppState {
  showUnsureModal?: boolean
  activePane?: ViewPanes
  deployTarget?: DeployTargets

  user?: IUser
}

export interface IAppContext extends IAppState {
  setContextValue: (payload: Pick<IAppState, keyof IAppState>) => void
}

export type PropsWithContext<T> = IAppContext & T

export const AppContext = React.createContext({})

export function withAppContext<T>(
  Component: React.FunctionComponent<PropsWithContext<T>>,
): (props: T) => React.ReactElement<PropsWithContext<T>> {
  return (props) => (
    <AppContext.Consumer>
      {(ctx) => <Component {...props} {...(ctx as IAppContext)} />}
    </AppContext.Consumer>
  )
}
