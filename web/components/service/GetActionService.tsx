// --- Interface --- //
interface ActionProps {
    name        : string;
    description : string;
    slug        : string;
    type        : string;
}

// --- Component --- //
const ActionButtonComponent = ({ name, description, color, slug, callback, type, index, secondaryCallback} : { name : string, description: string, color : string, slug: string, callback: (slug: string, description: string, color: string) => void, type: string, index: number, secondaryCallback: (index: number, type: string) => void }) => {
    return (
        <div className={`rounded-[10px] shadow-xl hover:brightness-125 flex-col flex-wrap w-[100%] p-[24px] flex`}
            style={{ backgroundColor: `${color}`}}
            onClick={() => {
                callback(slug, description, color)
                secondaryCallback(index, type);
            }}
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

const ActionListComponent = ({ actionList, color, theme, callback, cardIndex, secondaryCallback } : { actionList : ActionProps[], color : string, theme : string, callback: (slug: string, description: string, color: string) => void, cardIndex: number, secondaryCallback: (index: number, type: string) => void }) => {
    return (
        <div className={`font-bold grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 h-auto mb-[5rem]`}
            style={{ color: theme === 'light' ? "#363841" : "#ffffff" }}
        >
            {actionList.map((service, index) => (
                <ActionButtonComponent key={index} name={service.name} description={service.description} color={color} slug={service.slug} type={service.type} callback={callback} index={cardIndex} secondaryCallback={secondaryCallback} />
            ))}
        </div>
    );
}

const GetActionService = ({actions, color, theme = 'light', callback, index, secondaryCallback }: { actions: any[], color: string, theme?: string, callback: (slug: string, description: string, color: string) => void, index: number, secondaryCallback: (index: number, type: string) => void }) => {
    if (actions?.length === 0)
        return null;

    return (
        <ActionListComponent actionList={actions} color={color} theme={theme} callback={callback} secondaryCallback={secondaryCallback} cardIndex={index} />
    )
}

export default GetActionService
