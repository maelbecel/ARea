import Image from "next/image";

const HomeDetailsContainer = () => {
    return (
        <div className="flex justify-center text-black text-[20px] md:text-[25px] text-center">
            <div className="w-full md:w-[65%] xl:w-[45%] h-full flex flex-col justify-between items-center p-[25px] md:p-[50px] gap-[50px]">
                <div className="font-bold">
                    There are unlimited ways to save time
                </div>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-[90%] md:w-1/2">
                        <Image src='/Image/homeImage.png' width={345} height={300} alt="Home Image" className='cover' />
                    </div>
                    <div className="w-[90%] md:w-1/2 flex flex-col justify-around text-[15px] md:text-[20px]">
                        <div className="font-bold">
                            Cross post to multiple social networks
                        </div>
                        <div className="font-medium">
                            Save time by writing once and posting to multiple networks automatically.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomeDetailsContainer;
