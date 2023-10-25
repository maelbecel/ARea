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
import Button from '../components/Button/Button';
import { useRouter } from 'next/router';
import Image from 'next/image';

const PageHeaders = (connected: boolean, email: string) => {
  const router = useRouter();

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
            <Profile email={email} />
          </RightSection>
        </NavBar>
      ) : (
        <NavBar color={"222222"}>
          <LeftSection>
            <Icon theme={"dark"} />
          </LeftSection>
          <RightSection color={"222222"}>
            <SimpleLink     href="/sign-up" text="Sign up" theme={"dark"} />
            <Button callBack={() => { router.push("/sign-up") }} text="Sign in" backgroundColor={"#ffffff"} textColor={"#222222"} />
          </RightSection>
        </NavBar>
      )}
    </>
  )
}

const HomeStartContainer = () => {
  const router = useRouter();

  return (
    <div className="bg-[#222222] flex justify-center text-white text-center">
      <div className="w-full md:w-[65%] xl:w-[45%] h-full flex flex-col justify-between items-center p-[25px] md:p-[50px] gap-[50px]">
        <div className="font-bold text-[25px] md:text-[36px] lg:text-[52px]">
          Automation for business and home
        </div>
        <div className="font-medium text-[20px] md:text-[25px]">
          Save time and get more done
        </div>
        <Button callBack={() => { router.push("/sign-up") }} text="Start today" backgroundColor={"#ffffff"} textColor={"#222222"} size={true} />
      </div>
    </div>
  )
};

const HomeDownloadAPKContainer = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center text-black text-[20px] md:text-[25px] text-center">
      <div className="w-full md:w-[65%] xl:w-[45%] h-full flex flex-col justify-between items-center p-[25px] md:p-[50px] gap-[50px]">
        <div className="font-bold">
          The leading no-code platform on mobile
        </div>
        <div className="font-medium">
          Automate from anywhere, anytime. Our iOS and Android apps make it simple.
        </div>
        <Button callBack={() => { router.push("/install-step") }} text="Download APK" backgroundColor={"#363841"} textColor={"#ffffff"} size={true} />
      </div>
    </div>
  )
};

const HomeDetailsContainer = () => {
  return (
    <div className="flex justify-center text-black text-[20px] md:text-[25px] text-center">
      <div className="w-full md:w-[65%] xl:w-[45%] h-full flex flex-col justify-between items-center p-[25px] md:p-[50px] gap-[50px]">
        <div className="font-bold">
          There are unlimited ways to save time
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-[90%] md:w-1/2">
            <Image src='/Image/homeImage.png' width={345} height={300} alt="Home Image" className='cover' />
          </div>
          <div className="w-[90%] md:w-1/2 flex flex-col justify-around text-[15px] md:text-[20px]">
            <div className="font-bold">
              Cross post to multiple social networks
            </div>
            <div className="font-medium">
              Save time by writing once and posting to multiple networks automatically.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

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
      {PageHeaders(connected, user?.email as string)}

      <div className="w-full min-h-screen bg-background">
        {connected ? (
          <div className="flex items-center flex-col mt-[2em]">
            <div className="w-full flex justify-center items-center flex-col">
              <h1 className="text-center font-extrabold text-[#363841] text-[26px] md:text-[50px] mb-[1em] w-full">
                Explore services
              </h1>
            </div>
            <SearchService />
          </div>
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
