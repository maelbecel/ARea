import Link from "next/link"

const Cookie = () => {
    return (     
    <div className="flex justify-between">
        <div className="flex">
            <div>PharaCorp </div>
            <div className="px-[5px] translate-y-[-3px]">.</div>
            <Link href="/terms"><button className="hover:text-warning"> Teams of Service </button></Link>
            <div className="px-[5px] translate-y-[-3px]">.</div>
            <Link href="/privacy"><button className="hover:text-warning"> Privacy Policy </button></Link>
            <div className="px-[5px] translate-y-[-3px]">.</div>
            <Link href="cookie"><button className="hover:text-warning"> Cookie Policy</button></Link>
        </div>
        <div>Copyright © 2022. PharaCorp</div>
    </div>
    )
}

export default Cookie
  