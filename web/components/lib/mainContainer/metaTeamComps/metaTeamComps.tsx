import CompsCard from './CompsCard';

const MetaTeamComps = () => {
  return (
    <div className="h-full w-full flex justify-center">
        <div className="h-full w-[85%] flex flex-col">
            <div className="flex justify-between items-center">
                <div className="text-white font-bold font-sans text-3xl">META TEAM COMPS <span className="text-yellow-gold">UPDATED EVERY PATCH</span></div>
                <div className="flex items-center">
                    <div className="font-sans text-yellow-gold font-medium text-lg">Explore Meta Comps</div>
                    <svg className="pl-[5px]" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg%22%3E">
                        <path d="M8.29289 0.29289C8.68342 -0.09763 9.3166 -0.09763 9.7071 0.29289L13.7071 4.29289C14.0976 4.68342 14.0976 5.31658 13.7071 5.70711L9.7071 9.7071C9.3166 10.0976 8.68342 10.0976 8.29289 9.7071C7.90237 9.3166 7.90237 8.6834 8.29289 8.2929L10.5858 6H1C0.44772 6 0 5.55228 0 5C0 4.44772 0.44772 4 1 4H10.5858L8.29289 1.70711C7.90237 1.31658 7.90237 0.68342 8.29289 0.29289Z" fill="#F2BF43" />
                    </svg>
                </div>
            </div>
            <div className="pt-[30px] flex flex-col items-center w-full h-full space-y-5">
                <CompsCard first={["Claudia", ["Shiro", "Crow"]]}
                           second={["Lin", ["Lin"]]}
                           third={["Lyra", ["Lyra"]]}
                           simulacra={"Samir"}
                           name={"Claudia Carry"}
                >
                    Fully charges weapons will inflict damage equal to 137.00% of ATK with the next attack, and make the target grievous for 7 seconds, taking 20% extra damage.
                </CompsCard>
                <CompsCard first={["Claudia", ["Shiro", "Crow"]]}
                           second={["Lin", ["Lin"]]}
                           third={["Lyra", ["Lyra"]]}
                           simulacra={"Samir"}
                           name={"Claudia Carry"}
                >
                    Fully charges weapons will inflict damage equal to 137.00% of ATK with the next attack, and make the target grievous for 7 seconds, taking 20% extra damage.
                </CompsCard>
                <CompsCard first={["Claudia", ["Shiro", "Crow"]]}
                           second={["Lin", ["Lin"]]}
                           third={["Lyra", ["Lyra"]]}
                           simulacra={"Samir"}
                           name={"Claudia Carry"}
                >
                    Fully charges weapons will inflict damage equal to 137.00% of ATK with the next attack, and make the target grievous for 7 seconds, taking 20% extra damage.
                </CompsCard>
                <CompsCard first={["Claudia", ["Shiro", "Crow"]]}
                           second={["Lin", ["Lin"]]}
                           third={["Lyra", ["Lyra"]]}
                           simulacra={"Samir"}
                           name={"Claudia Carry"}
                >
                    Fully charges weapons will inflict damage equal to 137.00% of ATK with the next attack, and make the target grievous for 7 seconds, taking 20% extra damage.
                </CompsCard>
                <CompsCard first={["Claudia", ["Shiro", "Crow"]]}
                           second={["Lin", ["Lin"]]}
                           third={["Lyra", ["Lyra"]]}
                           simulacra={"Samir"}
                           name={"Claudia Carry"}
                >
                    Fully charges weapons will inflict damage equal to 137.00% of ATK with the next attack, and make the target grievous for 7 seconds, taking 20% extra damage.
                </CompsCard>
            </div>
        </div>
    </div>
  )
}

export default MetaTeamComps
