import Link from "next/link"

const Category = () => {
    return ( 
    <div className="flex-col flex font-[roboto] text-2xl font-normal tracking-[1px] text-gray-2 text-start">
        <div className="text-white pb-[17px] font-medium text-start">TOWER OF FANTASY</div>
        <Link href="/team-comps/meta"><button className="py-[3px] text-start">Meta Teams Comps</button></Link>
        <Link href="/team-comps/builder"><button className="py-[3px] text-start">Teams Comps Builder</button></Link>
        <Link href="/challenges"><button className="py-[3px] text-start">Challenges</button></Link>
        <Link href="/simulacra"><button className="py-[3px] text-start">ToF Simulacra</button></Link>
        <Link href="/tier-list"><button className="py-[3px] text-start">ToF Tier List</button></Link>
        <Link href="/interactive-map"><button className="py-[3px] text-start">Interactive Map</button></Link>
    </div>              
    )
}

export default Category
