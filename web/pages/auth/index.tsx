// --- Librairies import --- //
import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { getProviders, signIn, signOut, useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";

// --- Components --- //

//const IndexPage: NextPage = () => {
const IndexPage = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { data: session, status } = useSession()

    return (
        <div className="container w-6/12 mx-auto content-center justify-between bg-slate-100 rounded-lg">
            <p className="font-normal text-center">
            {!session && (
                <>
                    <span>You are not signed in:&nbsp;&nbsp;</span>
                    <a
                        href={`/api/auth/signin`}
                        onClick={(e) => {
                            e.preventDefault()
                            signIn('github')
                        }}
                    >
                        Sign in with Github
                    </a>
                        | 
                    <a
                        href={`/api/auth/signin`}
                        onClick={(e) => {
                            e.preventDefault()
                            signIn()
                        }}
                    >
                        Choose provider
                    </a>
                </>
            )}
            {session?.user && (
                <>
                    <span>
                        Signed in as:&nbsp;&nbsp;<br/><strong>{session.user.name} ({session.user.email})&nbsp;&nbsp;</strong>
                    </span>
                    <a
                        href={`/api/auth/signout`}
                        onClick={(e) => {
                            e.preventDefault()
                            signOut()
                        }}
                    >
                        Sign out
                    </a>
                </>
            )}
                    </p>
        </div>
    )
}

/*        {/*<>
            <h1>Identity provider</h1>
            <p>This is a custom identity provider selection page. Please select a provider:</p>
            {providers && Object.values(providers).map((provider: any) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>
                        Sign in with {provider.name}
                    </button>
                    <br/><br/>
                </div>
            ))}
            </>*/

const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
        console.log("User is already logged in. Redirecting...")

        return { redirect: { destination: "/" } };
    }

    const providers = await getProviders();

    return { props: { providers: providers ?? [] } };
}

export default IndexPage; // Add this line to make IndexPage the default export.
