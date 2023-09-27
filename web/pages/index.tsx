// --- Librairies --- //
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import Image from 'next/image';

// --- Provider --- //
import { useAuth } from '../components/providers/AuthProvider';

// --- Components --- //
import NavBar, { NavBarButton, SimpleLink, Profile } from '../components/navbar'
import Link from 'next/link';

const IndexPage: NextPage = () => {
  const { data: session } = useSession();

  const [sessionContent, setSession] = useState();
  const [jwtContent, setJwt] = useState();

  const [data, setData] = useState();

  const { token } = useAuth();

  const [connected  , setConnected]   = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (token || localStorage.getItem("token") !== null) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [token]);

  const handleClick = async () => {
    try {
      const response = await fetch('https://api.zertus.fr/area51/service/github/oauth2?redirecturi=http://localhost:8081', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
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
      {connected ? (
        <NavBar>
          <SimpleLink   href="/profile/my-applets" text="My applets" />
          <NavBarButton href="/create"             text="Create" />
          <Profile />
        </NavBar>
      ) : (
        <NavBar>
          <SimpleLink   href="/sign-up" text="Sign up" />
          <NavBarButton href="/login"   text="Login" />
        </NavBar>
      )}

      <div className="w-screen min-h-screen bg-background">
        {connected ? (
          <div className="flex items-center flex-col mt-[2em]">

            {/* Header */}
            <div className="w-full flex justify-center items-center flex-col mb-[7.5rem]">
              <h1 className="text-center font-extrabold text-[#363841] text-[2.6rem] mb-[1em] w-full">
                Explore services
              </h1>
              <div className="w-[40%] justify-between items-center flex-row bg-[#D9D9D9] rounded-[15px] mb-[1em] flex">
                <div className="m-[10px]">
                  <Image src="/Icons/search.svg" width={45} height={45} alt={"Icon"} />
                </div>
                <input value={searchValue}
                       placeholder="Search services"
                       onChange={(e) => setSearchValue(e.target.value)}
                       className="bg-transparent w-full text-[24px] font-bold text-[#363841] outline-none p-[10px]"
                />
              </div>
            </div>

            {/* Services */}
            <div className="font-bold text-[20px] text-white grid grid-cols-4 gap-5 h-auto mb-[5rem]">
            {/* Placeholder */}
              <Link href="/">
                <div className="bg-[#FF0000] flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]">
                  <Image src="/Logo/Logo.svg" width={120} height={120} alt={"Service Logo"} />
                  <span>YouTube</span>
                </div>
              </Link>
              <Link href="/">
                <div className="bg-[#6441a5] flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]">
                  <Image src="/Logo/Logo.svg" width={120} height={120} alt={"Service Logo"} />
                  <span>Twitch</span>
                </div>
              </Link>
              <Link href="/">
                <div className="bg-[#FF0000] flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]">
                  <Image src="/Logo/Logo.svg" width={120} height={120} alt={"Service Logo"} />
                  <span>Github</span>
                </div>
              </Link>
              <Link href="/">
                <div className="bg-[#333] flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]">
                  <Image src="/Logo/Logo.svg" width={120} height={120} alt={"Service Logo"} />
                  <span>Discord</span>
                </div>
              </Link>

              {/* Temp for test */}
              <Link href="/">
                <div className="bg-[#FF0000] flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]">
                  <Image src="/Logo/Logo.svg" width={120} height={120} alt={"Service Logo"} />
                  <span>YouTube</span>
                </div>
              </Link>
              <Link href="/">
                <div className="bg-[#333] flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]">
                  <Image src="/Logo/Logo.svg" width={120} height={120} alt={"Service Logo"} />
                  <span>Discord</span>
                </div>
              </Link>
              <Link href="/">
                <div className="bg-[#6441a5] flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]">
                  <Image src="/Logo/Logo.svg" width={120} height={120} alt={"Service Logo"} />
                  <span>Twitch</span>
                </div>
              </Link>
              <Link href="/">
                <div className="bg-[#FF0000] flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]">
                  <Image src="/Logo/Logo.svg" width={120} height={120} alt={"Service Logo"} />
                  <span>Github</span>
                </div>
              </Link>
              <Link href="/">
                <div className="bg-[#FF0000] flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]">
                  <Image src="/Logo/Logo.svg" width={120} height={120} alt={"Service Logo"} />
                  <span>Github</span>
                </div>
              </Link>
              <Link href="/">
                <div className="bg-[#333] flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]">
                  <Image src="/Logo/Logo.svg" width={120} height={120} alt={"Service Logo"} />
                  <span>Discord</span>
                </div>
              </Link>
            </div>
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
