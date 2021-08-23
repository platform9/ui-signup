import React from 'react'
import { ViewPanes, DeployTargets } from './constants'

export interface IUser {
  firstName?: string
  lastName?: string
  organizationName?: string
  organizationEmail?: string
}
export interface IEmbarkUser {
  vcode?: string
  password?: string
  confirmPassword?: string
}

export interface IAppState {
  showUnsureModal?: boolean
  activePane: ViewPanes
  deployTarget?: DeployTargets

  user: IUser
  embarkUser: IEmbarkUser
  formErrors: { [key: string]: string }
}

export const appDefaultState: IAppContext = {
  setContextValue: (payload) => {
    console.error('AppContext not found')
  },
  activePane: ViewPanes.GettingStarted,
  deployTarget: undefined,
  showUnsureModal: false,
  user: {},
  embarkUser: {},
  formErrors: {},
}

export interface IAppContext extends IAppState {
  setContextValue: (payload: Partial<Pick<IAppState, keyof IAppState>>) => void
}

export type PropsWithContext<T> = IAppContext & T

export const AppContext = React.createContext<IAppContext>(appDefaultState)

export function withAppContext<T>(
  Component:
    | React.FunctionComponent<PropsWithContext<T>>
    | React.ComponentClass<PropsWithContext<T>>,
): (props: T) => React.ReactElement<PropsWithContext<T>> {
  return (props) => (
    <AppContext.Consumer>{(ctx) => <Component {...props} {...ctx} />}</AppContext.Consumer>
  )
}
