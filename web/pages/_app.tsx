// --- Global CSS --- //
import '../styles/globals.css'

// --- Type --- //
import type { AppProps } from "next/app"
import type { Session } from "next-auth"

// --- Providers --- //
import { SessionProvider } from "next-auth/react"
import { UserProviders } from '../utils/api/user/UserProvider'

function MyApp({ Component, pageProps: { session, ...pageProps } } : AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <UserProviders>
        <Component {...pageProps} />
      </UserProviders>
    </SessionProvider>
  )
}

export default MyApp;
