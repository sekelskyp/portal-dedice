import { useFormState } from 'react-hook-form'

import { Button, ButtonProps } from '../design-system'

export const SubmitButton = (props: ButtonProps) => {
  const { children, ...rest } = props
  const { isSubmitting, isValid } = useFormState()

  return (
    <Button type="submit" loading={isSubmitting} disabled={!isValid} {...rest}>
      {children}
    </Button>
  )
}
