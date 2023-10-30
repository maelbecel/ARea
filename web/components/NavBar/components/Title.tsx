/**
 * Title only work on the Desktop View
 * @param text  Text of the title
 * @param theme Theme of the navbar
 */
const Title = ({ text, theme = 'light' }: { text: string, theme?: string }) => {
    return (
        <div className={`${theme === 'light' ? 'text-[#363841]' : 'text-white'} font-bold text-[32px] xl:text-[48px] hidden md:flex`}>
            {text}
        </div>
    )
}

export default Title;
