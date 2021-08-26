// Actions
import { makeRequest, MakeRequest } from './request'

// App
import { apiUrl, ViewPanes } from '../constants'
import { IEmbarkUser, IUser } from '../context'
import browserHistory from '../history'
import { SegmentAnalytics } from '../analytics'

export const navigate = (pane: ViewPanes, path = window.location.pathname) => {
  browserHistory.push({ route: `${path}?view=${pane}` })
}

interface CreateEmbarkUser {
  message: string
}

export const createEmbarkUser = async (user: IUser) => {
  const url = `${apiUrl}/v1/users`
  const response = await makeRequest<CreateEmbarkUser>(url, {
    method: 'POST',
    body: {
      email: user.organizationEmail,
      account_name: user.organizationName?.toLowerCase(),
      first_name: user.firstName,
      last_name: user.lastName,
    },
  })

  if (!response.success) {
    const message =
      response.data?.message || 'Sorry, your signup failed. Contact signup@platform9.com'
    SegmentAnalytics.track('WZ Sign-Up Submission Error - 1', {
      email: user.organizationEmail,
      firstname: user.firstName,
      lastname: user.lastName,
      account_name: user.organizationName,
      wizard_step: 'Web Sign Up Free Tier Create Account Submission Error',
      wizard_state: 'Error',
      wizard_progress: '1 of 2',
      wizard_name: 'Web Sign Up Free Tier',
      error_message: message,
    })
  } else {
    SegmentAnalytics.identifyAnonymous({
      email: user.organizationEmail,
      firstname: user.firstName,
      lastname: user.lastName,
      account_name: user.organizationName,
    })
    SegmentAnalytics.track('WZ Sign-Up Submitted - 1', {
      email: user.organizationEmail,
      firstname: user.firstName,
      lastname: user.lastName,
      account_name: user.organizationName,
      wizard_step: 'Web Sign Up Free Tier Create Account Submitted',
      wizard_state: 'Started',
      wizard_progress: '1 of 2',
      wizard_name: 'Web Sign Up Free Tier',
    })
  }
  return response
}

interface EmbarkVerifyAccount {
  account_name: string
  admin_user_email: string
  message: string
  region_url: string
}

export const validateEmbarkVerificationCode = async (
  organizationName: string,
  embarkUser: IEmbarkUser,
) => {
  const url = `${apiUrl}/v1/users/${organizationName}`
  const response = await makeRequest<EmbarkVerifyAccount>(url, {
    method: 'PUT',
    body: {
      vcode: embarkUser.vcode,
      password: embarkUser.password,
    },
  })
  if (!response.success) {
    SegmentAnalytics.track('WZ Sign-up Verification Code Failed', {
      verification_code: embarkUser.vcode,
      account_name: organizationName,
      wizard_step: 'Web Sign Up Free Tier Verification Code Submitted',
      wizard_name: 'Web Sign Up Free Tier',
    })
  } else {
    SegmentAnalytics.track('WZ Sign-up Verification Code Submitted - 2', {
      verification_code: embarkUser.vcode,
      account_name: organizationName,
      wizard_step: 'Web Sign Up Free Tier Verification Code Submitted',
      wizard_state: 'Finished',
      wizard_progress: '2 of 2',
      wizard_name: 'Web Sign Up Free Tier',
    })
  }
  return response
}

interface AuthenticateEmbarkUser {
  x_auth_token: string
  keystone_user_uuid: string
}
const trackAutoLoginFailure = (email, organizationName) => {
  SegmentAnalytics.track('WZ Sign-up Auto Login Failed', {
    email,
    account_name: organizationName,
    wizard_step: 'Web Sign Up Free Tier Auto Login Submitted',
    wizard_name: 'Web Sign Up Free Tier',
  })
}
export const authenticateUser = async (organizationName, { email, password, fqdn, vcode }) => {
  const url = `${apiUrl}/v1/users/${organizationName}`
  const response = await makeRequest<AuthenticateEmbarkUser>(url, {
    method: 'POST',
    body: {
      email,
      password,
    },
  })

  if (!response.success) {
    trackAutoLoginFailure(email, organizationName)
    return response
  }
  const scopedToken = response.data?.x_auth_token
  const keystoneId = response.data?.keystone_user_uuid

  SegmentAnalytics.identify(keystoneId, {
    email,
    account_name: organizationName,
    verification_code: vcode,
  })

  const keystoneResponse = await makeRequest(`${fqdn}/token2cookie/`, {
    headers: {
      'X-Auth-Token': scopedToken,
    },
    credentials: 'include',
  })
  if (!keystoneResponse.success) {
    trackAutoLoginFailure(email, organizationName)
    keystoneResponse.error = new Error(
      'Login failed. Please contact support@platform9.com for assistance.',
    )
    return keystoneResponse
  }
  SegmentAnalytics.track('WZ Sign-up Auto Login Success', {
    email,
    account_name: organizationName,
    wizard_step: 'Web Sign Up Free Tier Auto Login Submitted',
    wizard_name: 'Web Sign Up Free Tier',
  })
  autoLoginRedirect(fqdn)
  return keystoneResponse
}

interface ResendEmbarkVerifyEmail {
  message: string
}
export const resendEmbarkVerificationEmail = async (organizationName: string) => {
  const response = await makeRequest<ResendEmbarkVerifyEmail>(
    `${apiUrl}/v1/users/${organizationName}/vcode`,
    {
      method: 'PUT',
      body: {},
    },
  )

  if (!response.success) {
    SegmentAnalytics.track('WZ Sign-up Resend Verification Code Failed', {
      account_name: organizationName,
      wizard_step: 'Web Sign Up Free Tier Resend Verification Code Submitted',
      wizard_name: 'Web Sign Up Free Tier',
    })
  } else {
    SegmentAnalytics.track('WZ Sign-up Resend Verification Code Success', {
      account_name: organizationName,
      wizard_step: 'Web Sign Up Free Tier Resend Verification Code Submitted',
      wizard_name: 'Web Sign Up Free Tier',
    })
  }

  return response
}

export const autoLoginRedirect = (fqdn, target?: string) => {
  const destination = `${fqdn}/ui/pmkft/login`
  if (target) {
    window.open(destination, target)
  } else {
    window.location.href = destination
  }
}
