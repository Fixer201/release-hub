import LoginComponent from '@/components/auth/LoginComponent'
import { signUpAction } from '../action'

export default function SignUp() {
  return (
    <article className="flex size-full flex-col justify-start pt-8 text-3xl font-bold md:justify-center">
      <LoginComponent action={signUpAction} mode="/sign-up" />
    </article>
  )
}
