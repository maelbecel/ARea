// --- Interface --- //
interface ActionProps {
    name        : string;
    description : string;
    slug        : string;
    type        : string;
}

// --- Component --- //
const ActionButtonComponent = ({ name, description, color, slug, callback } : { name : string, description: string, color : string, slug: string, callback: (slug: string) => void }) => {
    return (
        <div className={`rounded-[10px] shadow-xl hover:brightness-125 flex-col flex-wrap w-[100%] p-[24px] flex`}
            style={{ backgroundColor: `${color}`}}
            onClick={() => { callback(slug) }}
        >
            <div className="font-bold text-[28px]">
                {name}
            </div>
            <div className="text-[20px] pt-[20px]">
                {description}
            </div>
        </div>
    )
}

const ActionListComponent = ({ actionList, color, theme, callback } : { actionList : ActionProps[], color : string, theme : string, callback: (slug: string) => void }) => {
    return (
        <div className={`font-bold grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 h-auto mb-[5rem]`}
            style={{ color: theme === 'light' ? "#363841" : "#ffffff" }}
        >
            {actionList.map((service, index) => (
                <ActionButtonComponent key={index} name={service.name} description={service.description} color={color} slug={service.slug} callback={callback} />
            ))}
        </div>
    );
}

const GetActionService = ({actions, color, theme = 'light', callback }: { actions: any[], color: string, theme?: string, callback: (slug: string) => void }) => {
    if (actions?.length === 0)
        return null;

    return (
        <ActionListComponent actionList={actions} color={color} theme={theme} callback={callback} />
    )
}

export default GetActionService
