import Image from 'next/image'

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // Header
    <main className="relative min-h-screen">
      <Image
        alt=""
        className="pointer-events-none -z-1 object-cover object-center brightness-50"
        fill
        priority
        sizes="100vw"
        src="/images/auth-bg.jpg"
      />
      <section className="flex h-screen w-full flex-col items-center pt-22 md:flex-row">
        <article className="flex w-full flex-col items-center justify-center gap-2 px-24 py-4 max-sm:px-0 ">
          <h1 className="text-2xl text-white">Welcome to</h1>
          <h2 className="text-6xl text-white">Orbit Hub</h2>
          <p className="text-xl text-gray-400">Control your projects</p>
        </article>
        {children}
      </section>
    </main>
  )
}
