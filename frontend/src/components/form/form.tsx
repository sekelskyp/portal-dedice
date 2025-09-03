import { createContext, type ReactNode, useEffect } from 'react'
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
  type UseFormProps,
} from 'react-hook-form'

export type FormProps<TFieldValues extends FieldValues = FieldValues> =
  UseFormProps<TFieldValues> & {
    children: ReactNode
    onSubmit: SubmitHandler<TFieldValues>
    noValidate?: boolean
    loading?: boolean
  }

// eslint-disable-next-line react-refresh/only-export-components
export const loadingContext = createContext(false)

export function Form<TFieldValues extends FieldValues = FieldValues>({
  children,
  onSubmit,
  noValidate = false,
  loading,
  defaultValues,
  ...rest
}: FormProps<TFieldValues>) {
  const methods = useForm<TFieldValues>({ defaultValues, ...rest })

  useEffect(() => {
    if (defaultValues instanceof Promise) {
      defaultValues.then((values) => methods.reset(values))
    } else {
      methods.reset(defaultValues as TFieldValues)
    }
  }, [defaultValues, methods])

  return (
    <loadingContext.Provider value={!!loading}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit, (e) => {
            console.debug('Cannot submit form value:', e)
            return e
          })}
          noValidate={noValidate}
        >
          {children}
        </form>
      </FormProvider>
    </loadingContext.Provider>
  )
}
