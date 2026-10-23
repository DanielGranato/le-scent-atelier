import { useState, type ComponentProps } from 'react'
import Input from './Input'

type PasswordInputProps = Omit<ComponentProps<typeof Input>, 'type' | 'adornment' | 'multiline'>

/** Password field with a "Show / Hide" text button inside it. */
export default function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      adornment={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-pressed={visible}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="cursor-pointer text-xs font-semibold uppercase tracking-(--tracking-label) underline underline-offset-4"
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      }
    />
  )
}
