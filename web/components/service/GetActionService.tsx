// --- Librairies import --- //
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

// --- Interface --- //
interface ActionProps {
    name        : string;
    description : string;
}

// --- Component --- //
const ActionComponent = ({ name, description, color, theme, service } : { name : string, description: string, color : string, theme : string, service : string }) => {
    const hexColor = color.substring(5, color.length - 1);
    
    return (
        <Link href={`/`}>
            <div className={`${color} rounded-[10px] shadow-xl hover:brightness-125 flex-col flex-wrap w-[100%] p-[24px] flex`}>
                <div className="font-bold text-[28px]">
                    {name}
                </div>
                <div className="text-[20px] pt-[20px]">
                    {description}
                </div>
            </div>
        </Link>
    )
}

const ActionListComponent = ({ actionList, name, color, theme } : { actionList : ActionProps[], name : string, color : string, theme : string }) => {
    return (
        <div className={`font-bold text-[20px] ${theme === 'light' ? "text-[#363841]" : "text-white"} grid grid-cols-4 gap-5 h-auto mb-[5rem]`}>
            {actionList.map((service, index) => (
                <ActionComponent key={index} name={service.name} description={service.description} color={color} theme={theme} service={name} />
            ))}
        </div>
    );
}

const GetActionService = ({ name, color, theme = 'light' }: { name: string, color: string, theme?: string }) => {
    const [action, setAction] = useState<ActionProps[]>([]);

    useEffect(() => {
        // TODO: remove placeholder, setup search bar

        // placeholder
        setAction([
            { name: "Nouvelle vidéo likée", description: `Cette action s’active à chaque fois que vous likez une vidéo` },
            { name: "Nouvelle vidéo likée", description: `Cette action s’active à chaque fois que vous likez une vidéo` },
            { name: "Nouvelle vidéo likée", description: `Cette action s’active à chaque fois que vous likez une vidéo` },
            { name: "Nouvelle vidéo likée", description: `Cette action s’active à chaque fois que vous likez une vidéo` },
            { name: "Nouvelle vidéo likée", description: `Cette action s’active à chaque fois que vous likez une vidéo` },
            { name: "Nouvelle vidéo likée", description: `Cette action s’active à chaque fois que vous likez une vidéo` },
            { name: "Nouvelle vidéo likée", description: `Cette action s’active à chaque fois que vous likez une vidéo` }
        ]);

    }, [])

    return (
        <>
            <ActionListComponent actionList={action} name={name} color={color} theme={theme} />
        </>
    )
}

export default GetActionService
