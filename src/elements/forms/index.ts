type FormValidators<T> = Array<{
  message: string
  validator: (value: string, formValues: FormValues<T>) => boolean
}>

type FieldValidators<T> = { [K in keyof T]: FormValidators<T> }
type FormValues<T> = { [K in keyof T]: any }

export default class FormValidator<T> {
  constructor(private fieldValidators: FieldValidators<T>) {}

  validate(form: FormValues<T>) {
    const foundErrors = {}
    for (const field of Object.keys(this.fieldValidators)) {
      const validators: FormValidators<T> = this.fieldValidators[field]
      const value = form[field]
      validators.every(({ validator, message }) => {
        if (!validator(value, form)) {
          foundErrors[field] = message
          return false
        }
        return true
      })
    }
    return { foundErrors, hasError: Object.keys(foundErrors).length > 0 }
  }
}
