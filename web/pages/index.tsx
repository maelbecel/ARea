// --- Librairies --- //
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

// --- Components --- //
import NavBar, { RightSection, LeftSection } from '../components/NavBar/navbar'
import Icon from '../components/NavBar/components/Icon';
import SearchService from '../components/service/SearchService';
import Footer from '../components/footer';
import SimpleLink from '../components/NavBar/components/SimpleLink';
import Profile from '../components/NavBar/components/Profile';
import { useUser } from '../utils/api/user/Providers/UserProvider';
import { GetProfile } from '../utils/api/user/me';
import { UserProfile } from '../utils/api/user/interface/interface';
import { NavigateButton } from '../components/NavBar/components/Button';

const IndexPage: NextPage = () => {
  const [token, setToken] = useState<string>('');
  const [connected  , setConnected] = useState<boolean>(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    setToken(localStorage.getItem("token") as string);

    if (token)
      setConnected(true);
    else
      setConnected(false);
  }, [token]);

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
      {connected ? (
        <NavBar>
          <LeftSection>
            <Icon />
          </LeftSection>
          <RightSection>
            <SimpleLink   href="/myApplets" text="My applets" />
            <NavigateButton href="/create"             text="Create" />
            <Profile email={user?.email} />
          </RightSection>
        </NavBar>
      ) : (
        <NavBar>
          <LeftSection>
            <Icon />
          </LeftSection>
          <RightSection>
            <SimpleLink   href="/sign-up" text="Sign up" />
            <NavigateButton href="/login"   text="Login" />
          </RightSection>
        </NavBar>
      )}

      <div className="w-full min-h-screen bg-background">
        {connected ? (
          <div className="flex items-center flex-col mt-[2em]">
            <div className="w-full flex justify-center items-center flex-col">
              <h1 className="text-center font-extrabold text-[#363841] text-[2.6rem] mb-[1em] w-full">
                Explore services
              </h1>
            </div>
            <SearchService />
          </div>
        ) : (
          <div>
            {/* TODO: Implement a home page (like help page)} */}
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default IndexPage
