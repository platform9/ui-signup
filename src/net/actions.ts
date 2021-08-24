import { ViewPanes } from '../constants'
import { IEmbarkUser, IUser } from '../context'
import browserHistory from '../history'
import { makeRequest } from './request'

const baseUrl = 'https://embark-prod.platform9.horse'

export const navigate = (pane: ViewPanes, path = window.location.pathname) => {
  browserHistory.push({ route: `${path}?view=${pane}` })
}

export const createEmbarkUser = async (user: IUser) => {
  const url = `${baseUrl}/v1/users`
  const response = await makeRequest(url, {
    method: 'POST',
    body: {
      email: user.organizationEmail,
      account_name: user.organizationName?.toLowerCase(),
      first_name: user.firstName,
      last_name: user.lastName,
    },
  })
  return response
}

export const validateEmbarkVerificationCode = async (
  organizationName: string,
  embarkUser: IEmbarkUser,
) => {
  const url = `${baseUrl}/v1/users/${organizationName}`
  const response = await makeRequest(url, {
    method: 'PUT',
    body: {
      vcode: embarkUser.vcode,
      password: embarkUser.password,
    },
  })
  return response
}

export const resendEmbarkVerificationEmail = async (organizationName: string) => {
  const response = await makeRequest(`${baseUrl}/v1/users/${organizationName}/vcode`, {
    method: 'PUT',
    body: {},
  })
  return response
}
