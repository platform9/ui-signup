import { ViewPanes } from './constants'
import { IAppContext, IAppState } from './context'

export function pxToRem(px) {
  return `${px / 16}rem`
}

export const getElementProps = (props: any = {}): any => {
  const {
    setContextValue,
    activePane,
    deployTarget,
    showUnsureModal,
    termsAccepted,
    user,
    embarkUser,
    formErrors,
    ...rest
  } = props
  return rest
}

export const syncState = (state: IAppState) => {
  localStorage.setItem('uiSignupAppState', JSON.stringify(state))
}
export const clearState = () => {
  localStorage.removeItem('uiSignupAppState')
}
export const getEmailFromUrl = (search = window.location.search) => {
  const searchParams = new URLSearchParams(search)
  return searchParams.get('email')
}
export const getActivePaneFromUrl = (search) => {
  const searchParams = new URLSearchParams(search)
  const activePane = searchParams.get('view') as ViewPanes
  return activePane
}
export const getActivePaneFromState = (state: IAppContext) => {
  if (!state.deployTarget) {
    return ViewPanes.GettingStarted
  } else if (
    !state.user ||
    !state.user.firstName ||
    !state.user.lastName ||
    !state.user.organizationName ||
    !state.user.organizationEmail
  ) {
    return ViewPanes.CreateUser
  } else if (
    !state.embarkUser ||
    !state.embarkUser.vcode ||
    !state.embarkUser.password ||
    !state.embarkUser.confirmPassword
  ) {
    return ViewPanes.ConfirmAndDeploy
  }
  return ViewPanes.GettingStarted
}

export const rehydrateState = (defaultState): IAppState => {
  let parsedState = {} as IAppState
  try {
    parsedState = JSON.parse(localStorage.getItem('uiSignupAppState') || '')
    const defaultEmail = getEmailFromUrl() || ''
    if (defaultEmail && !parsedState?.user?.organizationEmail) {
      parsedState.user.organizationEmail = defaultEmail
    }
  } catch (e) {
    parsedState = defaultState
  }
  return parsedState
}

export const findActiveView = (state: IAppContext) => {
  const activePane = getActivePaneFromUrl(window.location.search)
  const furthestPaneByState = getActivePaneFromState(state)

  // Nothing in the url, so use the state
  if (!activePane) {
    return furthestPaneByState
  }

  // Validate we have state data for the specified pane
  // The url is pointing to create user
  if (activePane === ViewPanes.CreateUser && furthestPaneByState !== ViewPanes.GettingStarted) {
    return activePane
  }
  // The url is pointing to confirm and deploy
  if (activePane === ViewPanes.ConfirmAndDeploy && furthestPaneByState === activePane) {
    return activePane
  }
  // active pane can only be getting started
  return activePane
}
