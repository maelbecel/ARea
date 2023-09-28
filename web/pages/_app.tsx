// --- Global CSS --- //
import '../styles/globals.css'

// --- Librairies import --- //
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import type { Session } from "next-auth"

// --- Components --- //
import Footer from '../components/footer'

function MyApp({ Component, pageProps: { session, ...pageProps } } : AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  )
}

export default MyApp;
