type FormValidators<T> = Array<{
  id: string
  message: string
  validator: (value: string, formValues: FormValues<T>) => boolean
}>

type FieldValidators<T> = { [K in keyof T]: FormValidators<T> }
type FormValues<T> = { [K in keyof T]: any }

export default class FormValidator<T> {
  constructor(private fieldValidators: FieldValidators<T>) {}

  validateField(field, form, stopAtFirstError = true) {
    const foundErrors: { [key: string]: any } = {}
    const validators: FormValidators<T> = this.fieldValidators[field]
    const value = form[field]
    validators.every(({ validator, message, id }) => {
      if (!validator(value, form)) {
        if (stopAtFirstError) {
          foundErrors[field] = message
          return false
        } else {
          foundErrors[id] = message
        }
      }
      return true
    })
    return foundErrors
  }
  validate(form: FormValues<T>) {
    let foundErrors: { [key: string]: any } = {}
    for (const field of Object.keys(this.fieldValidators)) {
      foundErrors = { ...foundErrors, ...this.validateField(field, form) }
    }
    return { foundErrors, hasError: Object.keys(foundErrors).length > 0 }
  }
}
