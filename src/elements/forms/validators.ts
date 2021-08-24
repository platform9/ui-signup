export const isValidString = (str: string = ''): boolean => {
  return !!str && str.trim().length > 0
}
export const isLowerCase = (str: string = ''): boolean => {
  return str.toLowerCase() === str
}
export const isValidEmail = (email: string = ''): boolean => {
  return /(.{2,}@.{2,}\..{2,})/.test(email)
}

export const isSixDigits = (str: string = ''): boolean => {
  return /^.{6}$/.test(str)
}
export const isMatchingValue = (key) => (value, formValues) => {
  return value === formValues[key]
}
