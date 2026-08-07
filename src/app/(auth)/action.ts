'use server'

import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import type { AuthState } from '@/components/auth/auth-types'

/**
 *
 */
export async function signInAction(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const emailValue = formData.get('email')
  const passwordValue = formData.get('current-password')

  if (typeof emailValue !== 'string' || typeof passwordValue !== 'string') {
    return { error: 'Enter your email and password.' }
  }

  const email = emailValue.trim().toLowerCase()
  const password = passwordValue

  if (!email || !password) {
    return { error: 'Enter your email and password.' }
  }

  //   TODO: Implement sign-in logic here (e.g., call an API, validate credentials, etc.)

  // TODO: Redirect to /dashboard
  redirect('/')
}

/**
 *
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
    return { error: 'Enter your email and password.' }
  }

  const email = emailValue.trim().toLowerCase()
  const password = passwordValue
  const confirmPassword = confirmPasswordValue

  if (!email || !password || !confirmPassword) {
    return { error: 'Enter your email and password.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  //   TODO: Implement sign-in logic here (e.g., call an API, validate credentials, etc.)

  /*
   * Проверить что такого пользователя нет в базе данных
   *
   * Если пользователь найден, то показать сообщение что такой пользователь уже есть и предложить восстановить пароль
   *
   * Сохранить данные пользователя в базе данных
   *
   */
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
    return { error: 'User with this email already exists.' }
  }

  // Хешируем пароль перед сохранением в базе данных
  const hashedPassword = await bcrypt.hash(password, 10)

  // Сохраняем нового пользователя в базе данных
  try {
    await db.user.create({
      data: {
        email: email,
        passwordHash: hashedPassword,
        username: email,
      },
    })
    // Предварительная проверка не исключает гонку между параллельными запросами. Поэтому обрабатываем ошибку уникальности P2002, если другой запрос успел создать пользователя раньше.
  } catch (error: unknown) {
    console.error('Error creating user:', error)
    return { error: 'An error occurred while creating the user.' }
  }

  /*
   * Автоматически авторизовать пользователя после регистрации
   * Сохранить данные пользователя в сессии
   * Перенаправить на страницу /dashboard
   */

  // TODO: Redirect to /dashboard
  redirect('/')
}

/**
 *
 */
export async function restorePasswordAction(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const emailValue = formData.get('email')

  if (typeof emailValue !== 'string') {
    return { error: 'Enter your email.' }
  }

  const email = emailValue.trim().toLowerCase()

  if (!email) {
    return { error: 'Enter your email.' }
  }
  //   TODO: Implement sign-in logic here (e.g., call an API, validate credentials, etc.)

  // TODO: Redirect to /dashboard
  redirect('/')
}
