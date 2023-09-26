// --- Librairies --- //
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";

// --- Components --- //
import NavBar, { NavBarButton, SimpleLink } from '../components/navbar'

const IndexPage: NextPage = () => {
  const { data: session } = useSession();

  const [sessionContent, setSession] = useState();
  const [jwtContent, setJwt] = useState();

  const [data, setData] = useState();

  useEffect(() => {
      const fetchSession = async () => {
          const res = await fetch("/api/endpoints/session")
          const json = await res.json()
          
          if (json.content)
              setSession(json.content)
      };

      const fetchJwt = async () => {
          const res = await fetch("/api/endpoints/jwt")
          const json = await res.json()

          if (json.content)
              setJwt(json.content)
      }

      fetchSession();
      fetchJwt();
  }, [session]);

  const handleClick = async () => {
    try {
      const response = await fetch('https://api.zertus.fr/area51/service/github/oauth2?redirecturi=http://localhost:8081', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const data = await response.json();

      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <NavBar>
        <SimpleLink   href="/sign-up" text="Sign up" />
        <NavBarButton href="/login"   text="Login" />
      </NavBar>

      <div className="w-screen h-screen bg-background select-none">
        <button onClick={() => handleClick()}>Github</button>
        {
          data && (
            <pre>
              <code>{JSON.stringify(data)}</code>
            </pre>
          )
        }

        <h1>Home</h1>
        <h1>Endpoints</h1>
        <p>You must be signed in to see responses.</p>
        <h2>Session</h2>
        <pre>/api/examples/session</pre>
        <pre><code>{JSON.stringify(sessionContent, null, 2)}</code></pre>
        <h2>JWT</h2>
        <pre>/api/examples/jwt</pre>
        <pre><code>{JSON.stringify(jwtContent, null, 2)}</code></pre>
      </div>
    </>
  )
}

export default IndexPage
