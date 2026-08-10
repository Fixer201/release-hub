'use server'

import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { hashPassword, verifyPassword } from '@/lib/password'
import { createSession } from '@/lib/session'
import type { AuthState } from '@/components/auth/auth-types'

/** Инициирует вход в аккаунт пользователя
 * @param _previousState Состояние формы, полученное в результате предыдущего вызова action
 * @param formData Данные отправленной формы входа в аккаунт
 * @returns Состояние формы с сообщением об ошибке; redirect при успехе
 */
export async function signInAction(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const emailValue = formData.get('email')
  const passwordValue = formData.get('current-password')

  if (typeof emailValue !== 'string' || typeof passwordValue !== 'string') {
    return {
      status: 'error',
      message: 'Enter your email and password.',
    }
  }

  const email = emailValue.trim().toLowerCase()
  const password = passwordValue

  if (!email || !password) {
    return {
      status: 'error',
      message: 'Enter your email and password.',
    }
  }

  //   TODO: Implement sign-in logic here (e.g., call an API, validate credentials, etc.)

  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      passwordHash: true,
    },
  })

  if (!user) {
    return {
      status: 'error',
      message: 'Invalid email or password',
    }
  }

  const isPasswordMatches = await verifyPassword(password, user.passwordHash)

  if (!isPasswordMatches) {
    return {
      status: 'error',
      message: 'invalid email or password',
    }
  }

  await createSession(user.id)

  // TODO: Redirect to /dashboard
  redirect('/')
}

/** Создаёт аккаунт пользователя, сохраняет данные в БД, создаёт сессию пользователя
 * @param _previousState Состояние формы, полученное в результате предыдущего вызова action
 * @param formData Данные отправленной формы регистрации
 * @returns Состояние формы с сообщением об ошибке; redirect при успехе
 */
export async function signUpAction(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const emailValue = formData.get('email')
  const passwordValue = formData.get('current-password')
  const confirmPasswordValue = formData.get('confirm-password')

  if (
    typeof emailValue !== 'string' ||
    typeof passwordValue !== 'string' ||
    typeof confirmPasswordValue !== 'string'
  ) {
    return {
      status: 'error',
      message: 'Enter your email and password.',
    }
  }

  const email = emailValue.trim().toLowerCase()
  const password = passwordValue
  const confirmPassword = confirmPasswordValue

  if (!email || !password || !confirmPassword) {
    return {
      status: 'error',
      message: 'Enter your email and password.',
    }
  }

  if (password !== confirmPassword) {
    return {
      status: 'error',
      message: 'Passwords do not match.',
    }
  }

  // Получаем пользователя из базы данных по email
  const user = await db.user.findUnique({
    select: {
      id: true,
      email: true,
    },
    where: {
      email,
    },
  })

  // Если пользователь найден, то возвращаем ошибку
  if (user) {
    return {
      status: 'error',
      message: 'User with this email already exists.',
    }
  }

  // Хешируем пароль перед сохранением в базе данных
  const hashedPassword = await hashPassword(password)
  let newUser: { id: string }

  // Сохраняем нового пользователя в базе данных
  try {
    newUser = await db.user.create({
      data: {
        email: email,
        passwordHash: hashedPassword,
        username: email,
      },
    })

    // Предварительная проверка не исключает гонку между параллельными запросами. Поэтому обрабатываем ошибку уникальности P2002, если другой запрос успел создать пользователя раньше.
  } catch (error: unknown) {
    console.error('Error creating user:', error)
    return {
      status: 'error',
      message: 'An error occurred while creating the user.',
    }
  }

  // Пытаемся зарегестрировать сессию пользователя
  try {
    await createSession(newUser.id)
  } catch (error: unknown) {
    console.error('Error creating session:', error)

    return {
      status: 'warning',
      message: 'Account created successfully. Please sign in.',
    }
  }

  // TODO: Redirect to /dashboard
  redirect('/')
}

/**
 * Инициирует восстановление пароля пользователя.
 *
 * @param _previousState Состояние формы, полученное в результате предыдущего вызова action
 * @param formData Данные отправленной формы восстановления пароля
 * @returns Состояние формы с сообщением об ошибке; redirect при успехе
 */
export async function restorePasswordAction(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const emailValue = formData.get('email')

  if (typeof emailValue !== 'string') {
    return {
      status: 'error',
      message: 'Enter your email.',
    }
  }

  const email = emailValue.trim().toLowerCase()

  if (!email) {
    return {
      status: 'error',
      message: 'Enter your email.',
    }
  }
  //   TODO: Implement sign-in logic here (e.g., call an API, validate credentials, etc.)

  // TODO: Redirect to /dashboard
  redirect('/')
}
