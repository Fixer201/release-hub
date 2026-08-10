import 'server-only'

import { createHash, randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

// __Host-* требует Secure, Path=/ и запрещает Domain, поэтому cookie привязана к конкретному host и не распространяется на поддомены
const SESSION_COOKIE_NAME = process.env.NODE_ENV === 'production' ? '__Host-session' : 'session'

const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

/**
 * Вычисляет SHA-256-хеш токена сессии
 *
 * В базе данных хранится только хеш, а исходный токен передаётся браузеру
 * через cookie. Это не позволяет использовать записи из базы как готовые
 * токены сессий в случае утечки данных
 *
 * @param token Исходный случайно сгенерированный токен сессии
 * @returns SHA-256-хеш токена в шестнадцатеричном формате
 */
function hashSessionToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

/**
 * Создаёт новую пользовательскую сессию.
 *
 * Генерирует случайный токен, сохраняет его хеш и срок действия
 * в базе данных, а исходный токен записывает в защищённую HttpOnly cookie
 *
 * @param userId Идентификатор пользователя, для которого создаётся сессия
 * @returns Promise, завершающийся после создания сессии и установки cookie
 */
export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString('base64url')
  const tokenHash = hashSessionToken(token)
  const expiresAt = new Date(Date.now() + SESSION_COOKIE_MAX_AGE * 1000) // Переводим в миллисекунды

  // Регистирируем сессию в базе данных
  await db.session.create({
    data: {
      tokenHash,
      expiresAt,
      user: {
        connect: { id: userId },
      },
    },
  })

  // Устанавливаем cookie с токеном сессии
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  })
}
