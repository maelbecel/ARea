// --- Librairies --- //
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

// --- Components --- //
import SearchService from '../components/service/SearchService';
import Footer from '../components/footer';
import { useUser } from '../utils/api/user/Providers/UserProvider';
import { GetProfile } from '../utils/api/user/me';
import { UserProfile } from '../utils/api/user/interface/interface';
import HomeStartContainer from '../components/HomePage/Container/HomeStartContainer';
import HomeDetailsContainer from '../components/HomePage/Container/HomeDetailsContainer';
import HomeDownloadAPKContainer from '../components/HomePage/Container/HomeDownloadAPKContainer';
import PageHeaders from '../components/HomePage/Headers';
import HomeExploreContainer from '../components/HomePage/Container/HomeExploreContainer';
import { useToken } from '../utils/api/user/Providers/TokenProvider';

const IndexPage: NextPage = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();

  useEffect(() => {
    setToken(localStorage.getItem("token") as string);

    if (token)
      setConnected(true);
    else
      setConnected(false);
  }, [setToken, token]);

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
