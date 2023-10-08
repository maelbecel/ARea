// --- Librairies import --- //
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";

// --- Components --- //
import NavBar, { LeftSection, MiddleSection, NavBarFuncButton, NavBarNavigateButtonIcon, RightSection, Title } from "../../../navbar";
import CreateButton from "../components/CreateButton";
import Image from "next/image";

// --- Interface --- //
import { Card, defaultAction, defaultReaction } from "../interface";
import { getTheme } from "../../../../utils/getTheme";

const CreateHeader = () => {
    const router = useRouter();

    return (
        <NavBar>
            <LeftSection>
                <NavBarFuncButton text="Back" func={() => router.back()} />
            </LeftSection>
            <MiddleSection>
                <Title text="Choose an action" />
            </MiddleSection>
            <RightSection>
                <NavBarNavigateButtonIcon href="/help">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={'#363841'} />
                    </svg>
                </NavBarNavigateButtonIcon>
            </RightSection>
        </NavBar>
    )
}

const CreateServiceCard = ({ cardProps, callback } : { cardProps: Card, callback: () => void }) => {
    const theme = getTheme(cardProps.decoration.backgroundColor);

    return (
        <>
            <div style={{
                    backgroundColor: cardProps.decoration.backgroundColor,
                    color          : (theme === "light" ? '#363841' : '#ffffff')
                }}
                className={`w-full flex justify-center items-center rounded-[15px] text-[62px] font-extrabold py-[36px] select-none hover:brightness-110`}
                onClick={() => { callback() }}
            >
                {cardProps.type === 'action' ? 'Action' : 'REAction'}
            </div>
        </>
    );
};

const CardComponent = ({ cardProps, index, setArray, array, setPages, setSlug, setService } : { cardProps: Card, index: number, setArray: Dispatch<SetStateAction<Card[]>>, array: Card[], setPages: Dispatch<SetStateAction<number>>, setSlug: Dispatch<SetStateAction<string>>, setService: Dispatch<SetStateAction<string>> }) => {
    const theme = getTheme(cardProps.decoration.backgroundColor);

    return (
        <div style={{
                backgroundColor: cardProps.decoration.backgroundColor,
                color          : (theme === "light" ? '#363841' : '#ffffff')
            }}
            className={`w-full flex rounded-[15px] flex-col hover:brightness-110`}
        >
            <div className='w-[95%] flex flex-row gap-[20px] justify-end pt-[8px]'>
                <div className='font-bold text-[16px] underline'
                    onClick={() => {
                        setSlug(cardProps.slug);
                        setService(cardProps.service);
                        setPages(4);
                    }}
                >
                    Edit
                </div>
                <div className='font-bold text-[16px] underline'
                    onClick={() => {
                        setArray(array.map((card: Card, i: number) => {
                            if (i === index) {
                                if (card.type === 'action')
                                    return defaultAction;
                                else
                                    return defaultReaction;
                            }
                            return card;
                        }));
                    }}
                >
                    Delete
                </div>
            </div>
            <div className="flex flex-row justify-start gap-6 px-[40px] pb-[30px]">
                <div className="font-extrabold text-[62px]">{cardProps.type === 'action' ? 'Action' : 'REAction'}</div>
                <Image src={cardProps.decoration.logoUrl} width={100} height={100} alt='' />
                <div className="font-bold text-[32px]">{cardProps.description}</div>
            </div>
        </div>
    );
};

const NewService = ({ setArray, index } : { setArray: Dispatch<SetStateAction<Card[]>>, index: number }) => {
    const addNewServiceAtIndex = (index: number) => {
        setArray((prevArray) => {
            const newArray = [...prevArray];
    
            if (index >= 0 && index < prevArray.length)
                newArray.splice(index, 0, defaultReaction);
            else
                newArray.push(defaultReaction);
    
            return newArray;
        });
    }

    return (
        <div className="w-[40px] h-[40px]"
            onClick={() => { addNewServiceAtIndex(index + 1); }}
        >
            <Image src={"/Icons/PlusButton.svg" } width={40} height={40} alt={""} />
        </div>
    );
}

const CreateContainerComponent = ({ setIndex, setPages, token, array, setArray, setSlug, setService }: { setIndex: Dispatch<SetStateAction<number>>, setPages: Dispatch<SetStateAction<number>>, token: string, array: Card[], setArray: Dispatch<SetStateAction<Card[]>>, setSlug: Dispatch<SetStateAction<string>>, setService: Dispatch<SetStateAction<string>> }) => {
    return (
        <div className={`min-h-screen flex justify-center items-center`}>
            <div className={`max-w-[50%] w-full flex justify-around items-center flex-col gap-[20px]`}>
                {array && array.map((service: Card, index: number) => {
                    return (
                        <>
                            {service.slug === "" ? (
                                <CreateServiceCard
                                    key={index}
                                    cardProps={service}
                                    callback={() => {
                                        setPages(1);
                                        setIndex(index);
                                    }}
                                />
                            ) : (
                                <CardComponent key={index} cardProps={service} index={index} setArray={setArray} array={array} setPages={setPages} setSlug={setSlug} setService={setService} />
                            )}
                            <NewService setArray={setArray} index={index} />
                        </>
                )})}
                {/* TODO: Create an applets fill the callback with the token */}
                <CreateButton name={"Continue"} callback={() => {}} />
            </div>
        </div>
    );
};

const CreatePages = ({ setIndex, setPages, token, array, setArray, setSlug, setService } : { setIndex: Dispatch<SetStateAction<number>>, setPages: Dispatch<SetStateAction<number>>, token: string, array: Card[], setArray: Dispatch<SetStateAction<Card[]>>, setSlug: Dispatch<SetStateAction<string>>, setService: Dispatch<SetStateAction<string>> }) => {
    return (
        <>
            <CreateHeader />
            <CreateContainerComponent setIndex={setIndex} setPages={setPages} token={token} array={array} setArray={setArray} setSlug={setSlug} setService={setService} />
        </>
    )
}

export default CreatePages;
