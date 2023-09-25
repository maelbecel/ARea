import SearchBar from "../navbar_components/searchbar"

const MainSearchBar = () => {
  return (
    <div className="w-full h-[556px] bg-galaxy flex items-center">
        <div className="w-full h-[228px] bg-transparent flex flex-col items-center">
            <div className="w-full h-[128px] bg-transparent flex flex-col items-center mb-[40px]">
                <div className="font-display text-4xl font-bold leading-title text-white">
                    WIN MORE IN <span className="text-yellow-gold">TOWER OF FANTASY</span>
                </div>
                <div className="font-[roboto] text-xl font-normal text-gray-2 text-center">
                    <div>
                        The ultimate gaming compagnion
                    </div>
                    <div>
                        that helps players of all skill levels improve and climb
                    </div>
                </div>
            </div>
            <SearchBar divSize="w-full" background="bg-transparent" weight="w-[556px]" height="h-[60px]" svg_weight="20" svg_height="20" id="searchbarMain" text="text-3xl font-[roboto] font-bold" />
        </div>
    </div>
  )
}

export default MainSearchBar
