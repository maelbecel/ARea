import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import type { NextPage } from 'next'

// --- API --- //
import { useToken } from '../utils/api/user/Providers/TokenProvider';
import { useUser } from '../utils/api/user/Providers/UserProvider';
import { GetProfile } from '../utils/api/user/me';

// --- Interface --- //
import { UserProfile } from '../utils/api/user/interface/interface';

// --- Components --- //
import PageHeaders from '../components/HomePage/Headers';
import HomeDownloadAPKContainer from '../components/HomePage/Container/HomeDownloadAPKContainer';
import HomeExploreContainer from '../components/HomePage/Container/HomeExploreContainer';
import HomeDetailsContainer from '../components/HomePage/Container/HomeDetailsContainer';
import HomeStartContainer from '../components/HomePage/Container/HomeStartContainer';
import Footer from '../components/Footer/Footer';

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
  }, [router, setToken]);

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
      {/* --- Headers --- */}
      <PageHeaders connected={connected} email={user?.email} />

      {/* --- Body --- */}
      <div className="w-full min-h-screen">
        {connected ? (
          <>
            {/* --- Connected --- */}
            <HomeExploreContainer />
          </>
        ) : (
          <>
            {/* --- Not Connected --- */}
            <HomeStartContainer />
            <HomeDownloadAPKContainer />
            <HomeDetailsContainer />
          </>
        )}
      </div>
  
      {/* --- Footer --- */}
      <Footer />
    </>
  );
}

export default IndexPage;
