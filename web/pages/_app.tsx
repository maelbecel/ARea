// --- Global CSS --- //
import '../styles/globals.css'

// --- Librairies import --- //
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import type { Session } from "next-auth"

// --- Components --- //
import Footer from '../components/footer'
import { AuthProvider } from '../components/providers/AuthProvider'

function MyApp({ Component, pageProps: { session, ...pageProps } } : AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </SessionProvider>
  )
}

export default MyApp;
