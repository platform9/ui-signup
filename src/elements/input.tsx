import React from 'react'
import { PropsWithContext, withAppContext } from '../context'

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
}

function Input(props: PropsWithContext<Props>) {
  return <input id="uiSignupElementsInput" value={props?.user?.[props.name]} {...props} />
}

export default withAppContext(Input)
