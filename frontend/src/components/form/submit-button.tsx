import { Button, ButtonProps } from '@components/ui'
import { useFormState } from 'react-hook-form'

export const SubmitButton = (props: ButtonProps) => {
  const { children, ...rest } = props
  const { isSubmitting } = useFormState()

  return (
    <Button type="submit" loading={isSubmitting} {...rest}>
      {children}
    </Button>
  )
}
