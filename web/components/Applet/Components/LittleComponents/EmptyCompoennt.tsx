const EmptyComponent = ({ type, onClick, bg, color } : { type: string, onClick : () => void, bg: string, color: string }) => {
    return (
        <div className={`w-full flex justify-center items-center rounded-[15px] text-[62px] font-extrabold py-[36px] select-none hover:brightness-110 bg-[#363841] text-[#ffffff]`} onClick={() => { onClick() }}
             style={{
                backgroundColor: bg,
                color: color
             }}
        >
            {type}
        </div>
    )
};

export default EmptyComponent;