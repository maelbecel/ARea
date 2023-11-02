import { useRouter } from "next/router";
import Button from "../../Button/Button";

const HomeStartContainer = () => {
    const router = useRouter();
  
    return (
        <div className="bg-[#222222] flex justify-center text-white text-center">
            <div className="w-full md:w-[65%] xl:w-[45%] h-full flex flex-col justify-between items-center p-[25px] md:p-[50px] gap-[50px]">
                <div className="font-bold text-[25px] md:text-[36px] lg:text-[52px]">
                    Automation for business and home
                </div>
                <div className="font-medium text-[20px] md:text-[25px]">
                    Save time and get more done
                </div>
                <Button callBack={() => { router.push("/sign-up") }} text="Start today" backgroundColor={"#ffffff"} textColor={"#222222"} size={true} />
            </div>
        </div>
    )
};

export default HomeStartContainer;
