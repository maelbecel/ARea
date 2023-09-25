type GenericPageProps = {
  var: any
  state: Boolean
}

const Collapse = (props : GenericPageProps) => {
    const handleClick = () => {
        if (props.state)
          props.var(false);
        else
          props.var(true);
    }

    return (
        <div>
            <button className={props.state ? "hidden" : "w-[200px] h-[53px] bg-mainbg border-t-[1px] border-r-[1px] border-navbarborder font-roboto font-medium text-sm text-purple flex items-center hover:border-purple hover:bg-navbarborder"}
                    onClick={handleClick}>
                <svg className="ml-[14px] rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M16 1C16 0.447715 15.5523 0 15 0C14.4477 0 14 0.447715 14 1V15C14 15.5523 14.4477 16 15 16C15.5523 16 16 15.5523 16 15V1Z" fill="#AAABCA" />
                    <path d="M8.20711 3.79289C7.81658 3.40237 7.18342 3.40237 6.79289 3.79289C6.40237 4.18342 6.40237 4.81658 6.79289 5.20711L8.58579 7H1C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9H8.58579L6.79289 10.7929C6.40237 11.1834 6.40237 11.8166 6.79289 12.2071C7.18342 12.5976 7.81658 12.5976 8.20711 12.2071L11.7071 8.70711C12.0976 8.31658 12.0976 7.68342 11.7071 7.29289L8.20711 3.79289Z" fill="#AAABCA" />
                </svg>
                <div className="ml-[20px]">
                    Collapse
                </div>
            </button>
            <button className={props.state ? "w-[64px] h-[53px] bg-mainbg border-t-[1px] border-r-[1px] border-navbarborder flex items-center" : "hidden"}
                    onClick={handleClick}>
                <svg className="ml-[14px]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M16 1C16 0.447715 15.5523 0 15 0C14.4477 0 14 0.447715 14 1V15C14 15.5523 14.4477 16 15 16C15.5523 16 16 15.5523 16 15V1Z" fill="#AAABCA" />
                    <path d="M8.20711 3.79289C7.81658 3.40237 7.18342 3.40237 6.79289 3.79289C6.40237 4.18342 6.40237 4.81658 6.79289 5.20711L8.58579 7H1C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9H8.58579L6.79289 10.7929C6.40237 11.1834 6.40237 11.8166 6.79289 12.2071C7.18342 12.5976 7.81658 12.5976 8.20711 12.2071L11.7071 8.70711C12.0976 8.31658 12.0976 7.68342 11.7071 7.29289L8.20711 3.79289Z" fill="#AAABCA" />
                </svg>
            </button>
        </div>
    )
}

export default Collapse
