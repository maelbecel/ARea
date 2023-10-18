// --- Librairies import --- //
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

// --- Components --- //
import NavBar, { LeftSection, MiddleSection, RightSection } from "../../../NavBar/navbar";
import CreateButton from "../components/CreateButton";
import Image from "next/image";

// --- Interface --- //
import { Card, defaultAction, defaultReaction } from "../interface";
import { getTheme } from "../../../../utils/getTheme";
import Title from "../../../NavBar/components/Title";
import { ButtonIconNavigate, CallBackButton } from "../../../NavBar/components/Button";
import { create } from "domain";
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";
import { CreateApplet } from "../../../../utils/api/applet/applet";

const CreateHeader = () => {
    const router = useRouter();

    return (
        <NavBar>
            <LeftSection>
                <CallBackButton text="Back" func={() => router.back()} />
            </LeftSection>
            <MiddleSection>
                <Title text="Choose an action" />
            </MiddleSection>
            <RightSection>
                <ButtonIconNavigate href="/help">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={'#363841'} />
                    </svg>
                </ButtonIconNavigate>
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

const CardComponent = ({ cardProps, index, setArray, array, setPages, setSlug, setService, setEditMode, setIndex } : { cardProps: Card, index: number, setArray: Dispatch<SetStateAction<Card[]>>, array: Card[], setPages: Dispatch<SetStateAction<number>>, setSlug: Dispatch<SetStateAction<string>>, setService: Dispatch<SetStateAction<string>>, setEditMode: Dispatch<SetStateAction<boolean>>, setIndex: Dispatch<SetStateAction<number>> }) => {
    const theme = getTheme(cardProps.decoration.backgroundColor);

    return (
        <div style={{
                backgroundColor: cardProps.decoration.backgroundColor,
                color          : (theme === "light" ? '#363841' : '#ffffff')
            }}
            className={`w-full flex rounded-[15px] flex-col hover:brightness-110 cursor-pointer`}
        >
            <div className='w-[95%] flex flex-row gap-[20px] justify-end pt-[5px] sm:pt-[8px]'>
                <div className='font-bold text-[12px] sm:text-[16px] underline'
                    onClick={() => {
                        setSlug(cardProps.slug);
                        setService(cardProps.service);
                        setIndex(index);
                        setEditMode(true);
                        setPages(4);
                    }}
                >
                    Edit
                </div>
                <div className='font-bold text-[12px] sm:text-[16px] underline'
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
            <div className="flex flex-row justify-start gap-6 px-[5px] md:px-[40px] pb-[5px] md:pb-[30px] items-center">
                <div className="font-extrabold text-[24px] sm:text-[48px] lg:text-[62px]">{cardProps.type === 'action' ? 'Action' : 'REAction'}</div>
                <Image src={cardProps.decoration.logoUrl} width={100} height={100} alt='' />
                <div className="font-bold text-[18px] sm:text-[24px] lg:text-[32px]">{cardProps.name}</div>
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

interface appletsInputs {
    name: string;
    label: string;
    value: string;
    options: string[];
    type: string;
};

const CreateContainerComponent = ({ setIndex, setPages, array, setArray, setSlug, setService, active, setActive, title, notif, setEditMode, currentIndex }: { setIndex: Dispatch<SetStateAction<number>>, setPages: Dispatch<SetStateAction<number>>, array: Card[], setArray: Dispatch<SetStateAction<Card[]>>, setSlug: Dispatch<SetStateAction<string>>, setService: Dispatch<SetStateAction<string>>, active: boolean, setActive: Dispatch<SetStateAction<boolean>>, title: string, notif: boolean, setEditMode: Dispatch<SetStateAction<boolean>>, currentIndex: number }) => {
    const { token, setToken } = useToken();

    const router = useRouter();

    const handleClick = async () => {
        if (token === "") {
            const tokenStore = localStorage.getItem("token");
    
            if (tokenStore === null) {
                router.push("/");
                return;
            }
            setToken(tokenStore);
        }

        let actionsInputs = [] as appletsInputs[];

        array[0].inputs.forEach((input: string, index: number) => {
            actionsInputs.push({
                name: array[0].fields[index].name,
                label: array[0].fields[index].label,
                value: input,
                options: array[0].fields[index].options,
                type: array[0].fields[index].type
            });
        });

        // TODO: mutli-reaction

        let reactionsInputs = [] as appletsInputs[];

        array[1].inputs.forEach((input: string, index: number) => {
            reactionsInputs.push({
                name: array[1].fields[index].name,
                label: array[1].fields[index].label,
                value: input,
                options: array[1].fields[index].options,
                type: array[1].fields[index].type
            });
        });

        const body = {
            name: title,
            actionSlug: array[0].slug,
            actionInputs: actionsInputs,
            reactionSlug: array[1].slug,
            reactionInputs: reactionsInputs,
            notifUser: notif
        };

        console.log(body);

        await CreateApplet(token, body, router);
    };

    return (
        <div className={`min-h-screen flex justify-center items-center`}>
            <div className={`lg:max-w-[75%] xl:max-w-[60%] w-[90%] lg:w-full flex justify-around items-center flex-col gap-[20px] py-[10px]`}>
                {array && array.map((service: Card, index: number) => {
                    return (
                        <>
                            {service.slug === "" ? (
                                <CreateServiceCard
                                    key={index}
                                    cardProps={service}
                                    callback={() => {
                                        if (index > 0 && !active)
                                            return;
                                        if (index === 0)
                                            setActive(true);
                                        setPages(1);
                                        setIndex(index);
                                    }}
                                />
                            ) : (
                                <CardComponent key={index} cardProps={service} index={index} setArray={setArray} array={array} setPages={setPages} setSlug={setSlug} setService={setService} setEditMode={setEditMode} setIndex={setIndex} />
                            )}
                            <NewService setArray={setArray} index={index} />
                        </>
                )})}
                <CreateButton name={"Continue"} callback={() => {handleClick()}} />
            </div>
        </div>
    );
};

const CreatePages = ({ setIndex, setPages, token, array, setArray, setSlug, setService, active, setActive, title, notif, setEditMode, index } : { setIndex: Dispatch<SetStateAction<number>>, setPages: Dispatch<SetStateAction<number>>, token: string, array: Card[], setArray: Dispatch<SetStateAction<Card[]>>, setSlug: Dispatch<SetStateAction<string>>, setService: Dispatch<SetStateAction<string>>, active: boolean, setActive: Dispatch<SetStateAction<boolean>>, title: string, notif: boolean, setEditMode: Dispatch<SetStateAction<boolean>>, index: number }) => {
    return (
        <>
            <CreateHeader />
            <CreateContainerComponent setIndex={setIndex} setPages={setPages} array={array} setArray={setArray} setSlug={setSlug} setService={setService} active={active} setActive={setActive} title={title} notif={notif} setEditMode={setEditMode} currentIndex={index} />
        </>
    )
}

export default CreatePages;
