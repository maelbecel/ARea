// --- Librairies --- //
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const IndexPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (window.opener)
      window.opener.postMessage('OAuth2CallbackCompleted', '*');

    setTimeout(() => {
      window.close();
    }, 1000);

    router.push("/");
  }, [router])

  return ( <></> );
}

export default IndexPage;
