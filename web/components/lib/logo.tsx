import Image from 'next/image'
import Link from 'next/link'

type GenericPageProps = {
  state: Boolean
}

const Logo = (props: GenericPageProps) => {
  return (
    <div>
        <div className={props.state ? "hidden" : "w-[200px] h-[52px] bg-navbarborder border-b-[1px] border-r-[1px] border-navbarborder flex justify-center items-center transition-75"}>
          <Link href="/">
            <Image src="/logo/PharaCorp.png" width={133.46} height={36} alt="PharaCorp's Logo" />
          </Link>
        </div>
        <div className={props.state ? "w-[64px] h-[52px] bg-navbarborder border-b-[1px] border-r-[1px] border-navbarborder flex justify-center items-center transition-75" : "hidden"}>
          <Link href="/">
            <Image src="/logo/PharaCorp-Mini.png" width={43} height={45} alt="PharaCorp's Logo" />
          </Link>
        </div>
    </div>
  )
}

export default Logo
