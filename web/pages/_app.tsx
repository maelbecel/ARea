// --- Global CSS --- //
import '../styles/globals.css'

// --- Type --- //
import type { AppProps } from "next/app"
import type { Session } from "next-auth"

// --- Providers --- //
import { SessionProvider } from "next-auth/react"
import { UserProviders } from '../utils/api/user/Providers/UserProvider'
import { TokenProviders } from '../utils/api/user/Providers/TokenProvider'

function MyApp({ Component, pageProps: { session, ...pageProps } } : AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <TokenProviders>
        <UserProviders>
          <Component {...pageProps} />
        </UserProviders>
      </TokenProviders>
    </SessionProvider>
  )
}

export default MyApp;
