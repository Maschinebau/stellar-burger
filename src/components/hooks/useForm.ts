import { ChangeEvent, useState } from "react"

type FormValues = {
  [key: string]: string
}

type FormProps = {
  values: FormValues
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  setValues: (values: FormValues) => void
}

export const useForm = (inputValues: FormValues = {}): FormProps => {
  const [values, setValues] = useState<FormValues>(inputValues)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setValues({ ...values, [name]: value })
  }

  return { values, handleChange, setValues }
}
