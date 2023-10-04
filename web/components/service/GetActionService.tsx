// --- Librairies import --- //
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

// --- Interface --- //
interface ActionProps {
    name        : string;
    description : string;
    slug        : string;
    type        : string;
}

// --- Component --- //
const ActionComponent = ({ name, description, color, service, slug, type } : { name : string, description: string, color : string, service : string, slug: string, type: string }) => {
    const router = useRouter();

    let action = router.query.type as string

    if (action === undefined)
        action = type;

    return (
        <Link href={`/service/auth?service=${service}&slug=${slug}${`&type=${action}`}`}>
            <div className={`rounded-[10px] shadow-xl hover:brightness-125 flex-col flex-wrap w-[100%] p-[24px] flex`}
                style={{ backgroundColor: `${color}`}}
            >
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
        <div className={`font-bold text-[20px] grid grid-cols-4 gap-5 h-auto mb-[5rem]`}
            style={{ color: theme === 'light' ? "#363841" : "#ffffff" }}
        >
            {actionList.map((service, index) => (
                <ActionComponent key={index} name={service.name} description={service.description} color={color} service={name} slug={service.slug} type={service.type} />
            ))}
        </div>
    );
}

const GetActionService = ({ slug, actions, color, theme = 'light' }: { slug: string, actions: any[], color: string, theme?: string }) => {
    if (actions?.length === 0)
        return null;

    return (
        <>
            <ActionListComponent actionList={actions} name={slug} color={color} theme={theme} />
        </>
    )
}

export default GetActionService
