import type { NextPage } from 'next'
import Menu from '../components/menu'
import MainSearchBar from '../components/lib/mainContainer/mainSearchBar'
import WhatIsToF from '../components/lib/mainContainer/whatIsToF'
import Footer from '../components/lib/footer/footer'
import { useEffect, useState } from 'react'
import MetaTeamComps from '../components/lib/mainContainer/metaTeamComps/metaTeamComps'
import { useSession } from "next-auth/react";

const IndexPage: NextPage = () => {
  const [menuState, setmenuState] = useState<Boolean>(false);
  
  const { data: session } = useSession();

  const [sessionContent, setSession] = useState();
  const [jwtContent, setJwt] = useState();

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

    console.log(sessionContent);

  return (
    <div className="w-screen bg-background select-none">
      <Menu menuState={menuState} setmenuState={setmenuState}>
        <div className={menuState ? "flex-col ml-[64px]" : "flex-col ml-[200px]"}>
          <MainSearchBar />
          <MetaTeamComps />
          <WhatIsToF /> {/* A Finir */}
          <Footer />
        </div>
      </Menu>
      <h1>Home</h1>
        <h1  >Endpoints</h1>
          <p >You must be signed in to see responses.</p>
          <h2  >Session</h2>
          <pre>/api/examples/session</pre>
          <pre><code>{JSON.stringify(sessionContent, null, 2)}</code></pre>
          <h2  >JWT</h2>
          <pre>/api/examples/jwt</pre>
  <pre><code>{JSON.stringify(jwtContent, null, 2)}</code></pre>
    </div>
  )
}

export default IndexPage
