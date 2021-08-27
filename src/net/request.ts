export const appendQueryString = (urlPath: string, params: { [key: string]: any }) => {
  const searchParams = new URLSearchParams()
  for (const key of Object.keys(params)) {
    searchParams.append(key, params[key])
  }
  return `${urlPath}?${searchParams.toString()}`
}

export const makeRequest = async <T>(
  url: string,
  options = {} as IRequestOptions,
): Promise<MakeRequest<T>> => {
  try {
    if (!options) options = {}
    options.method = options.method || 'GET'

    if (options.body && (options.method === 'POST' || options.method === 'PUT')) {
      options.body = JSON.stringify(options.body)
    } else if (options.body) {
      url = appendQueryString(url, options.body)
      delete options.body
    }

    if (!options.headers) options.headers = {}
    const headers = new Headers()
    for (const key of Object.keys(options.headers)) {
      headers.append(key, options.headers[key])
    }
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')
    options.headers = headers

    const response = await fetch(url, options as any)
    const json = await response.json()
    if (!response.ok) {
      throw new Error(json?.message || json)
    }
    return { success: true, data: json }
  } catch (e) {
    console.error(e)
    return { success: false, error: e }
  }
}

export interface IRequestOptions {
  body?: any
  method?: string
  headers?: Headers | object
  credentials?: Request['credentials']
}

export interface MakeRequest<T> {
  success: boolean
  error?: Error
  data?: T
}
