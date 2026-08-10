'use client'
import Form from 'next/form'
import Link from 'next/link'
import { useActionState } from 'react'
import type { AuthAction, AuthMode, AuthState } from './auth-types'

interface LoginComponentProps {
  mode: AuthMode
  action: AuthAction
}

function Title({ mode }: Readonly<{ mode: AuthMode }>) {
  let title

  switch (mode) {
    case '/sign-in': {
      title = 'Sign In'
      break
    }
    case '/sign-up': {
      title = 'Sign Up'
      break
    }
    case '/restore-password': {
      title = 'Restore Password'
      break
    }
    default: {
      title = 'Login'
    }
  }

  return title
}

const INITIAL_STATE: AuthState = {
  status: 'idle',
  message: null,
}

export default function LoginComponent({ mode, action }: Readonly<LoginComponentProps>) {
  const [state, formAction, pending] = useActionState(action, INITIAL_STATE)

  return (
    <Form
      action={formAction}
      className="mx-4 flex h-auto flex-col gap-2 rounded-xl bg-black/60 px-8 py-10 text-xl shadow-lg backdrop-blur-md"
    >
      <h3 className="pb-2 text-2xl font-bold text-white">{Title({ mode })}</h3>

      <label className="text-xl font-medium text-white" htmlFor="email">
        Email
      </label>
      <input
        autoComplete="email"
        className="auth-input"
        id="email"
        name="email"
        placeholder="you@example.com"
        required
        type="email"
      />

      {(mode === '/sign-up' || mode === '/sign-in') && (
        <>
          <label className="text-xl font-medium text-white" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="new-password"
            className="auth-input"
            id="password"
            name="current-password"
            placeholder="••••••••"
            required
            type="password"
          />
        </>
      )}

      {mode === '/sign-in' && (
        <Link className="text-lg font-light text-white hover:underline" href="/restore-password">
          Forgot The Password?
        </Link>
      )}

      {mode === '/sign-up' && (
        <>
          <label className="text-xl font-medium text-white" htmlFor="confirm-password">
            Confirm Password
          </label>

          <input
            autoComplete="new-password"
            className="auth-input"
            id="confirm-password"
            name="confirm-password"
            placeholder="••••••••"
            required
            type="password"
          />
        </>
      )}

      {state.message !== null && (
        <p
          aria-live={state.status === 'error' ? 'assertive' : 'polite'}
          className={state.status === 'error' ? 'text-red-500' : 'text-yellow-500'}
        >
          {state.message}
        </p>
      )}

      {/* TODO: Implement loading circle animation on pending */}
      <button
        className="mt-4 rounded bg-white p-2 text-black transition-colors duration-200 hover:bg-black hover:text-white"
        disabled={pending}
        type="submit"
      >
        {Title({ mode }) === 'Sign Up' ? 'Register' : Title({ mode })}
      </button>
      <Link
        className="self-center pt-1 text-lg font-light text-white hover:underline"
        href={mode === '/sign-up' ? '/sign-in' : '/sign-up'}
      >
        {Title({ mode }) === 'Sign Up'
          ? 'Already have an account? Sign In'
          : "Don't have an account? Sign Up"}
      </Link>
    </Form>
  )
}
