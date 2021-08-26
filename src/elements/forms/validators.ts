export const isValidString = (str: string = ''): boolean => {
  return !!str && str.trim().length > 0
}
export const isLowerCase = (str: string = ''): boolean => {
  return str.toLowerCase() === str
}
export const isValidEmail = (email: string = ''): boolean => {
  return /(.{2,}@.{2,}\..{2,})/.test(email)
}
export const hasMinLength =
  (minLen: number, fixed = false) =>
  (str) =>
    fixed ? str.length === minLen : str.length >= minLen

export const isMatchingValue = (key) => (value, formValues) => {
  return value === formValues[key]
}

export const hasLowercaseLetter = (str: string = '') => str.toUpperCase() !== str
export const hasUppercaseLetter = (str: string = '') => str.toLowerCase() !== str

export const specialChars = '-+!@#$%^&*()?'
const specialCharRegex = new RegExp(`[${specialChars}]`)
export const hasSpecialCharacter = (str: string = '') => specialCharRegex.test(str)
