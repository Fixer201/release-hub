export type AuthMode = '/restore-password' | '/sign-in' | '/sign-up'

export type AuthState =
  | {
      status: 'error'
      message: string
    }
  | {
      status: 'idle'
      message: null
    }
  | {
      status: 'success'
      message: string
    }
  | {
      status: 'warning'
      message: string
    }

export type AuthAction = (previousState: AuthState, formData: FormData) => Promise<AuthState>
