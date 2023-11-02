const CreateButton = ({ name, callback } : { name: string, callback: () => void }) => {
    return (
        <div className={`w-[80%] md:w-[50%] flex justify-center items-center rounded-[50px] text-[36px] font-bold py-[27px] select-none active:bg-white bg-[#363841] text-white active:text-[#363841]`}
            onClick={() => {callback()}}
        >
            {name}
        </div>
    );
};

export default CreateButton;
