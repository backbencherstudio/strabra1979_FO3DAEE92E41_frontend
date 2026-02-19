export function isDevEnv() {
  return process.env.NODE_ENV === 'development'
}

export const TwScreenSize = () => {
  if (!isDevEnv()) {
    return null
  }

  return (
    <div className="fixed right-3 bottom-3 z-50 h-8 w-8 text-center text-base leading-8 text-white *:absolute *:inset-0 *:rounded-sm *:bg-red-500">
      <span>NIL</span>
      <span className="xs:block hidden">xs</span>
      <span className="hidden sm:block">sm</span>
      <span className="hidden md:block">md</span>
      <span className="hidden lg:block">lg</span>
      <span className="hidden xl:block">xl</span>
      <span className="hidden 2xl:block">2xl</span>
      <span className="3xl:block hidden">3xl</span>
      <span className="4xl:block hidden">4xl</span>
      <span className="5xl:block hidden">5xl</span>
    </div>
  )
}

export const TwContainerQuerySize = () => {
  if (!isDevEnv()) {
    return null
  }

  return (
    <div className="absolute top-0 right-0 z-50 flex w-full justify-end outline">
      <div className="relative m-3 h-8 w-8 text-center text-base leading-8 text-white *:absolute *:inset-0 *:rounded-sm *:bg-green-500">
        <span>NIL</span>
        <span className="hidden @3xs:block">3xs</span>
        <span className="hidden @2xs:block">2xs</span>
        <span className="hidden @xs:block">xs</span>
        <span className="hidden @sm:block">sm</span>
        <span className="hidden @md:block">md</span>
        <span className="hidden @lg:block">lg</span>
        <span className="hidden @xl:block">xl</span>
        <span className="hidden @2xl:block">2xl</span>
        <span className="hidden @3xl:block">3xl</span>
        <span className="hidden @4xl:block">4xl</span>
        <span className="hidden @5xl:block">5xl</span>
        <span className="hidden @6xl:block">6xl</span>
        <span className="hidden @7xl:block">7xl</span>
      </div>
    </div>
  )
}
