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

                <a href='app.apk' download={'app.apk'} className="bg-[#363841] text-white font-bold items-center justify-center flex rounded-[50px] w-2/3 p-5">
                    Download APK
                </a>
            </div>
        </div>
    )
};

export default HomeDownloadAPKContainer;
