const ClickableText = ({ text, onClick } : { text: string, onClick: () => void }) => {
    return (
        <div className='font-bold text-[12px] sm:text-[16px] underline'
             onClick={() => { onClick(); }}
        >
            {text}
        </div>
    );
};

export default ClickableText;
