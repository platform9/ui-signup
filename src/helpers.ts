import { ViewPanes } from './constants'
import { IAppContext, IAppState } from './context'

export function pxToRem(px) {
  return `${px / 16}rem`
}

export const getElementProps = (props: any = {}): any => {
  const { setContextValue, activePane, termsAccepted, user, embarkUser, formErrors, ...rest } =
    props
  return rest
}

export const syncState = (state: IAppState) => {
  localStorage.setItem('uiSignupAppState', JSON.stringify(state))
}
export const clearState = () => {
  localStorage.removeItem('uiSignupAppState')
}
export const getSearchValueFromUrl =
  (target) =>
  (search = window.location.search) => {
    const searchParams = new URLSearchParams(search)
    return searchParams.get(target)
  }
export const getActivePaneFromUrl = (search) => {
  const searchParams = new URLSearchParams(search)
  const activePane = searchParams.get('view') as ViewPanes
  return activePane
}
export const getActivePaneFromState = (state: IAppContext) => {
  if (
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
  return ViewPanes.CreateUser
}

export const getDefaultEmail = getSearchValueFromUrl('email')
export const getDefaultOrganizationName = getSearchValueFromUrl('accountName')
export const getDefaultVcode = getSearchValueFromUrl('vcode')
export const getDefaultFirstName = getSearchValueFromUrl('firstName')
export const getDefaultLastName = getSearchValueFromUrl('lastName')

export const rehydrateState = (defaultState): IAppState => {
  let parsedState = {} as IAppState
  try {
    const newState = JSON.parse(localStorage.getItem('uiSignupAppState') || '')
    if (newState) parsedState = newState
    const defaultEmail = getDefaultEmail() || ''
    const defaultOrganizationName = getDefaultOrganizationName() || ''
    const defaultVcode = getDefaultVcode() || ''
    const defaultFirstName = getDefaultFirstName() || ''
    const defaultLastName = getDefaultLastName() || ''
    if (!parsedState.user) parsedState.user = {} as IAppState['user']
    if (!parsedState.embarkUser) parsedState.embarkUser = {} as IAppState['embarkUser']
    if (defaultFirstName) {
      parsedState.user.firstName = defaultFirstName
    }
    if (defaultLastName) {
      parsedState.user.lastName = defaultLastName
    }
    if (defaultEmail) {
      parsedState.user.organizationEmail = defaultEmail
    }
    if (defaultOrganizationName) {
      parsedState.user.organizationName = defaultOrganizationName
    }
    if (defaultVcode) {
      parsedState.embarkUser.vcode = defaultVcode
    }
  } catch (e) {
    parsedState = defaultState
  }
  return parsedState
}

export const findActiveView = (state: IAppContext) => {
  const activePane = getActivePaneFromUrl(window.location.search)

  // Nothing in the url, so use the state
  if (!activePane) {
    return getActivePaneFromState(state)
  }
  return activePane
}
