export type AuthMode = '/restore-password' | '/sign-in' | '/sign-up'

export interface AuthState {
  error: null | string
}

export type AuthAction = (previousState: AuthState, formData: FormData) => Promise<AuthState>
