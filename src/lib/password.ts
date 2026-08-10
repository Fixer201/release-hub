import 'server-only'
import * as argon2 from 'argon2'

const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 19_456,
  timeCost: 3,
  parallelism: 1,
} as const

/**
 * Хэширует пароль пользователя перед сохранением его в базу данных
 *
 * В базе данных хранится только хеш. Это не позволяет использовать хэши из базы как готовые пароли в случае утечки данных
 *
 * @param token Исходный случайно сгенерированный токен сессии
 * @returns хеш пароля
 */
export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, ARGON2_OPTIONS)
}

/**
 * Сравнивает полученный пароль с хэшем пароля из базы данных.
 *
 * @param password обычная строка пароля в открытом виде полученная от пользователя
 * @param passwordHash зашифрованный вид пароля из базы данных
 * @returns true если пароли совпадают; false если различаются
 */
export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  return argon2.verify(passwordHash, password)
}
