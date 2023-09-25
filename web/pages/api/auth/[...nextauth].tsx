// --- Librairies import --- //
import { randomBytes, randomUUID } from "crypto"
import NextAuth, { NextAuthOptions } from "next-auth"

// --- Providers --- //
import GithubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId    : process.env.GITHUB_CLIENT_ID     as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        DiscordProvider({
            clientId    : process.env.DISCORD_CLIENT_ID     as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        }),
    ],
    pages: { signIn: '/auth/index' },
    session: {
        // Learn more about sessions: 
        // https://next-auth.js.org/configuration/options#session
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        generateSessionToken: () => {
            return "SESH~" + randomUUID?.()
        }
    },
    callbacks: {
        // Learn more about refresh token rotations here: 
        // https://authjs.dev/guides/basics/refresh-token-rotation
        async jwt({ token, account }) {
            token.custom_property = randomUUID?.() ?? randomBytes(32).toString("hex")

            if (account && account.id_token)
                token.id_token = account.id_token
            return Promise.resolve(token)
        }
    },
    // For debugging:
    // events: {
    //   async signIn({ user, account, profile }) {
    //     console.log(`xxx signIn profile=${JSON.stringify(profile, null, 2)}`)
    //     console.log(`xxx signIn user=${JSON.stringify(user, null, 2)}`)
    //     console.log(`xxx signIn account.id_token=${JSON.stringify(account?.id_token, null, 2)}`)
    //   },
    // },
    debug: true,
}

export default NextAuth(authOptions)
