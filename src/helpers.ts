export const getElementProps = (props: any = {}): any => {
  const {
    setContextValue,
    activePane,
    deployTarget,
    showUnsureModal,
    user,
    formErrors,
    ...rest
  } = props
  return rest
}