// --- Librairies --- //
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

// --- Components --- //
import Footer from '../../components/footer';
import { useUser } from '../../utils/api/user/Providers/UserProvider';
import { GetProfile } from '../../utils/api/user/me';
import { UserProfile } from '../../utils/api/user/interface/interface';
import { useRouter } from 'next/router';
import Button from '../../components/Button/Button';
import { useToken } from '../../utils/api/user/Providers/TokenProvider';
import PageHeaders from '../../components/InstallStepPage/Headers';
import TitleContainer from '../../components/InstallStepPage/Container/TitleContainer';
import StepContainer from '../../components/InstallStepPage/Container/StepContainer';

const IndexPage: NextPage = () => {
  const [connected  , setConnected] = useState<boolean>(false);
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();

  useEffect(() => {
    setToken(localStorage.getItem("token") as string);

    if (token)
      setConnected(true);
    else
      setConnected(false);
  }, [token, setToken]);

  useEffect(() => {
    if (connected === false)
      return;

    const getProfile = async (token: string) => {
      setUser(await GetProfile(token) as UserProfile);
    }

    if (user?.email === "" || user?.email === null)
      getProfile(token);
  }, [token, user, setUser, connected]);

  const router = useRouter();

  return (
    <>
        <PageHeaders connected={connected} email={user?.email} />

        <div className="w-full min-h-screen text-[#363841]">
            <TitleContainer />
            <StepContainer />
        </div>

        <Footer />
    </>
  )
}

export default IndexPage
