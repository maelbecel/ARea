type GenericPageProps = {
    state: Boolean
}

const Version = (props : GenericPageProps) => {
    return (
        <div className={props.state ? "w-[64px] h-[51px] flex justify-center items-center border-r-[1px] border-navbarborder bg-version hover:border-purple"
                                    : "w-[200px] h-[51px] flex justify-center items-center border-r-[1px] border-navbarborder bg-version hover:border-purple"}>
            <div className={props.state ? "text-white font-bold text-[14px] font-[roboto]"
                                        : "text-white font-bold text-[22px] font-[roboto]"}>
                v1.0.10
            </div>
        </div>
    )
}

export default Version