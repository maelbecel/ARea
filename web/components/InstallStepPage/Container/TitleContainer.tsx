import { useRouter } from "next/router";
import Button from "../../Button/Button";

const TitleContainer = () => {
    const router = useRouter();

    return (
        <div className="flex-col lg:flex-row flex justify-start items-center p-[25px] md:p-[50px] gap-5">
            <div className="w-full lg:w-[25%] flex items-start lg:justify-center">
                <Button callBack={() => { router.back() }} text="Back" backgroundColor={"#363841"} textColor={"#ffffff"} half={2} />
            </div>
            <div className="w-full lg:w-[50%] flex justify-center text-center items-center font-bold text-[24px] md:text-[32px]">
                Let&apos;s install the APK of our mobile app !
            </div>
        </div>
    )
}

export default TitleContainer;
