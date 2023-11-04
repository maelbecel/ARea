// --- Librairies --- //
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

// --- Components --- //
import Footer from '../components/Footer/Footer';
import { useUser } from '../utils/api/user/Providers/UserProvider';
import { GetProfile } from '../utils/api/user/me';
import { UserProfile } from '../utils/api/user/interface/interface';
import HomeStartContainer from '../components/HomePage/Container/HomeStartContainer';
import HomeDetailsContainer from '../components/HomePage/Container/HomeDetailsContainer';
import HomeDownloadAPKContainer from '../components/HomePage/Container/HomeDownloadAPKContainer';
import PageHeaders from '../components/HomePage/Headers';
import HomeExploreContainer from '../components/HomePage/Container/HomeExploreContainer';
import { useToken } from '../utils/api/user/Providers/TokenProvider';
import { useRouter } from 'next/router';

const IndexPage: NextPage = () => {
  // --- Variables --- //
  const [connected, setConnected] = useState<boolean>(false);

  // --- Providers --- //
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();

  // --- Router --- //
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token") as string);

    if (token)
      setConnected(true);
    else
      setConnected(false);
  }, [setToken, token]);

  useEffect(() => {
    const queryToken = router.query.token as string;

    if (queryToken === undefined)
      return;
    setToken(queryToken);

    localStorage.setItem("token", queryToken);

    setConnected(true);
    setUser({
      ...user,
      loginWithService: true
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (connected === false)
      return;

    const getProfile = async (token: string) => {
      setUser(await GetProfile(token) as UserProfile);
    }

    if (user?.email === "" || user?.email === null)
      getProfile(token);
  }, [token, user, setUser, connected]);

  return (
    <>
      <PageHeaders connected={connected} email={user?.email} />

      <div className="w-full min-h-screen">
        {connected ? (
          <HomeExploreContainer />
        ) : (
          <>
            <HomeStartContainer />
            <HomeDownloadAPKContainer />
            <HomeDetailsContainer />
          </>
        )}
      </div>

      <Footer />
    </>
  )
}

export default IndexPage
