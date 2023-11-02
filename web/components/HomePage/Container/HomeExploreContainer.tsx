import SearchService from "../../service/SearchService";

const HomeExploreContainer = () => {
    return (
        <div className="flex items-center flex-col mt-[2em]">
            <div className="w-full flex justify-center items-center flex-col">
                <h1 className="text-center font-extrabold text-[#363841] text-[26px] md:text-[50px] mb-[1em] w-full">
                    Explore services
                </h1>
            </div>
            <SearchService />
        </div>
    )
};

export default HomeExploreContainer;
