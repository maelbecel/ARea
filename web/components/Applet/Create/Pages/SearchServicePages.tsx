// --- Librairies --- //
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

// --- Components --- //
import NavBar, { RightSection, LeftSection, MiddleSection } from '../../../NavBar/navbar'
import SearchService from '../../../Service/SearchService'
import Title from '../../../NavBar/components/Title'
import { ButtonIconNavigate } from '../../../NavBar/components/Button'
import Button from '../../../Button/Button'

// --- Interface --- //
import { ActionApplet, ReactionApplet } from '../../Interface/interface'

// --- Header --- //
const SearchServiceHeader = ({ callback }: { callback: () => void }) => {
    return (
        <NavBar>
          <LeftSection>
            <Button text="Back"
                    callBack={() => callback()}
                    backgroundColor={'#363841'}
                    textColor={'#ffffff'}
                    half={(typeof window !== 'undefined' && window.innerWidth < 768) ? 1 : 4}
            />
          </LeftSection>
          <MiddleSection>
            <Title text="Choose a service" />
          </MiddleSection>
          <RightSection width={true}>
              <ButtonIconNavigate href="/help">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={'#363841'} />
                </svg>
              </ButtonIconNavigate>
          </RightSection>
        </NavBar>
    )
}

const SearchServicePages = ({ setPages, pages } : { setPages: Dispatch<SetStateAction<number>>, pages: number }) => {
  // --- Variables --- //
  const [filter, setFilter] = useState<string>("action");

  // --- UseEffect --- //

  /**
   * First frame useEffect
   */
  useEffect(() => {
    if ((localStorage.getItem("index") as string) === null)
      setFilter("action");
    else
      setFilter("reaction");
  }, [pages]);

  // --- Function --- //

  const goBack = () => {
    const index = localStorage.getItem("index") as string;

    if (index !== null) {
      const reactionsStr = localStorage.getItem("reactions") as string;
      let reactions = JSON.parse(reactionsStr) as ReactionApplet[];

      reactions[parseInt(index)].reactionSlug = "";

      localStorage.setItem("reactions", JSON.stringify(reactions));
      localStorage.removeItem("index");
    } else {
      const actionStr = localStorage.getItem("action") as string;
      let action = JSON.parse(actionStr) as ActionApplet;

      action.actionSlug = "";

      localStorage.setItem("action", JSON.stringify(action));
    }

    setPages(0);
  };

  const callBack = (slug: string) => {
    const index = localStorage.getItem("index") as string;

    if (index === null) {
      const actionStr = localStorage.getItem("action") as string;
      let action = JSON.parse(actionStr) as ActionApplet;

      action.actionSlug = slug;

      localStorage.setItem("action", JSON.stringify(action));
    } else {
      const reactionsStr = localStorage.getItem("reactions") as string;
      let reactions = JSON.parse(reactionsStr) as ReactionApplet[];

      reactions[parseInt(index)].reactionSlug = slug;

      localStorage.setItem("reactions", JSON.stringify(reactions));
    }

    setPages(2);
  };

  return (
    <>
      <SearchServiceHeader callback={() => { goBack() }} />

      <div className="w-screen min-h-screen bg-background">
        <div className="flex items-center flex-col mt-[2em]">
          <SearchService type={"button"}
                         callback={(slug: string) => { callBack(slug) }}
                         filterType={filter}
          />
        </div>
      </div>
    </>
  )
}

export default SearchServicePages;