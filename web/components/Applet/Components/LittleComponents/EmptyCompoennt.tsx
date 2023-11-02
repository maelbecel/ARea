const EmptyComponent = ({ type, onClick } : { type: string, onClick : () => void }) => {
    return (
        <div className={`w-full flex justify-center items-center rounded-[15px] text-[62px] font-extrabold py-[36px] select-none hover:brightness-110 bg-[#363841] text-[#ffffff]`} onClick={() => { onClick() }}>
            {type}
        </div>
    )
};

export default EmptyComponent;