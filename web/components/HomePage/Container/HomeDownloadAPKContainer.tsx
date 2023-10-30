import { useRouter } from "next/router";
import Button from "../../Button/Button";

const HomeDownloadAPKContainer = () => {
    const router = useRouter();
  
    return (
        <div className="flex justify-center text-black text-[20px] md:text-[25px] text-center">
            <div className="w-full md:w-[65%] xl:w-[45%] h-full flex flex-col justify-between items-center p-[25px] md:p-[50px] gap-[50px]">
                <div className="font-bold">
                    The leading no-code platform on mobile
                </div>
                <div className="font-medium">
                    Automate from anywhere, anytime. Our iOS and Android apps make it simple.
                </div>
                <Button callBack={() => { router.push("/install-step") }} text="Download APK" backgroundColor={"#363841"} textColor={"#ffffff"} size={true} />
            </div>
        </div>
    )
};

export default HomeDownloadAPKContainer;
