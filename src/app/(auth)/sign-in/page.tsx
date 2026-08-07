import LoginComponent from '@/components/auth/LoginComponent'
import { signInAction } from '../action'

export default function SignIn() {
  return (
    <article className="flex size-full flex-col justify-start pt-8 text-3xl font-bold md:justify-center">
      <LoginComponent action={signInAction} mode="/sign-in" />
    </article>
  )
}
