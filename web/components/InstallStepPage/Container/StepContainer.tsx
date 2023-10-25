const StepContainer = () => {
    return (
        <div className="flex-col flex justify-center items-center p-[25px] md:p-[50px] gap-5">
            <div className="font-bold text-[32px] md:text-[40px] w-full md:w-[75%] xl:w-[50%] justify-start">
                Step
            </div>
            <div className="font-medium text-[24px] md:text-[30px] w-full md:w-[75%] xl:w-[50%] justify-start text-start">
                Warning: Some features can not work, depends on your mobile device (IOS or Android).
            </div>
            <div className="font-semibold text-[26px] md:text-[32px] w-full md:w-[75%] xl:w-[50%] justify-start">
                1.
            </div>
            <div className="font-medium text-[24px] md:text-[30px] w-full md:w-[75%] xl:w-[50%] justify-start">
                Transfer the APK to your device with the adapted USB cable.
            </div>
            <div className="font-semibold text-[26px] md:text-[32px] w-full md:w-[75%] xl:w-[50%] justify-start">
                2.
            </div>
            <div className="font-medium text-[24px] md:text-[30px] w-full md:w-[75%] xl:w-[50%] justify-start">
                Open APK in your mobile device. A pop-up go to be opened, and you can click in accept.
            </div>
            <div className="font-semibold text-[26px] md:text-[32px] w-full md:w-[75%] xl:w-[50%] justify-start">
                3.
            </div>
            <div className="font-medium text-[24px] md:text-[30px] w-full md:w-[75%] xl:w-[50%] justify-start">
                Check if the app is correctly installed, and launch it.
            </div>
            <div className="font-semibold text-[26px] md:text-[32px] w-full md:w-[75%] xl:w-[50%] justify-start">
                Have fun :)
            </div>
        </div>
    )
}

export default StepContainer;
