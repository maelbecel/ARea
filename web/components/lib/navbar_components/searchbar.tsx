import { useState } from 'react'

type GenericPageProps = {
  divSize: string
  background: string
  weight: string
  height: string
  svg_weight: string
  svg_height: string
  id: string
  text: string
}

const SearchBar = (props: GenericPageProps) => {
    const [active, setActive] = useState(false)

    const handleClick = () => {
      if (active)
        setActive(false)
      else
        setActive(true)
    }

    return (
        <div className={`${props.divSize} h-full flex justify-center items-center ${props.background}`}>
            <button className={active ?
                                `${props.weight} ${props.height} bg-white rounded-[5px] flex items-center rounded-b-[0px] border-[1px] border-yellow-gold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]` :
                                `${props.weight} ${props.height} bg-white rounded-[5px] flex items-center`}
                    onClick={handleClick}>
                <svg className="text-purple ml-[7px]" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width={props.svg_weight} height={props.svg_height} viewBox="0 0 24 24" fill="none">
                    <path d="M16.6177 18.0319C15.078 19.2635 13.125 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 13.125 19.2635 15.078 18.0319 16.6177L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L16.6177 18.0319ZM18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11Z" fill="white" />
                </svg>
                <input placeholder='Search for Simulacra'
                       className={`w-[400px] h-[28px] bg-transparent border-none outline-none bg-white ml-[5px] text-black ${props.text}`}
                       id="searchbar"
                       onClick={handleClick} />
            </button>
        </div>
    )
  }

  export default SearchBar
