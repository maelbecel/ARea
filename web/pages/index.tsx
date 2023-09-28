// --- Librairies --- //
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

// --- Components --- //
import NavBar, { NavBarNavigateButton, SimpleLink, Profile, RightSection, LeftSection, Icon } from '../components/navbar'
import SearchService from '../components/service/SearchService';

const IndexPage: NextPage = () => {
  const [token, setToken] = useState<string>('');
  const [connected  , setConnected]   = useState<boolean>(false);

  useEffect(() => {
    setToken(localStorage.getItem("token") as string);

    if (token)
      setConnected(true);
    else
      setConnected(false);
  }, [token]);

  return (
    <>
      {connected ? (
        <NavBar>
          <LeftSection>
            <Icon />
          </LeftSection>
          <RightSection>
            <SimpleLink   href="/profile/my-applets" text="My applets" />
            <NavBarNavigateButton href="/create"             text="Create" />
            <Profile />
          </RightSection>
        </NavBar>
      ) : (
        <NavBar>
          <LeftSection>
            <Icon />
          </LeftSection>
          <RightSection>
            <SimpleLink   href="/sign-up" text="Sign up" />
            <NavBarNavigateButton href="/login"   text="Login" />
          </RightSection>
        </NavBar>
      )}

      <div className="w-screen min-h-screen bg-background">
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
    </>
  )
}

export default IndexPage
