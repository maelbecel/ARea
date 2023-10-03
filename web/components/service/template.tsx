// --- Librairies import --- //
import Image from "next/image";

const ServiceInfoContainer = ({ color, url, theme, name } : { color: string, url: string, theme: string, name: string }) => {
    return (
        <div className={`w-full flex justify-center flex-col gap-7 p-6 select-none`}
            style={{ backgroundColor: `${color}` }}
        >
            <Image src={url} width={168} height={168} alt={"Service Logo"} className={"object-contain"} />
            <div className={`font-bold text-[50px] flex justify-center`}
                style={{ color: (theme === 'dark') ? '#ffffff' : '#363841' }}
            >
                {name}
            </div>
        </div>
    )
};

export { ServiceInfoContainer };
