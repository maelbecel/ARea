const SignIn = () => {
  return (
    <div>
      <button className="h-[32px] w-[88.48px] bg-yellow-gold text-black flex justify-center items-center rounded-[3px] font-[roboto] font-bold text-xs mr-[12px]
                     hover:bg-yellow hidden xl:block">
        SIGN IN
      </button>
      <button className="h-[32px] w-[32px] bg-yellow-gold text-black flex justify-center items-center rounded-[3px] mr-[12px]
                       hover:bg-yellow xl:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H13C14.6569 22 16 20.6569 16 19V18.5C16 17.9477 15.5523 17.5 15 17.5C14.4477 17.5 14 17.9477 14 18.5V19C14 19.5523 13.5523 20 13 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4H13C13.5523 4 14 4.44772 14 5V6C14 6.55228 14.4477 7 15 7C15.5523 7 16 6.55228 16 6V5C16 3.34315 14.6569 2 13 2H6Z" fill="black" />
          <path d="M10.9029 16.717C11.2989 17.102 11.932 17.0931 12.317 16.6971C12.702 16.3011 12.6931 15.668 12.2971 15.283L10.4631 13.5H20C20.5523 13.5 21 13.0523 21 12.5C21 11.9477 20.5523 11.5 20 11.5H10.4631L12.2971 9.71699C12.6931 9.33201 12.702 8.69891 12.317 8.30292C11.932 7.90694 11.2989 7.89802 10.9029 8.28301L7.30292 11.783C7.10926 11.9713 7 12.2299 7 12.5C7 12.7701 7.10926 13.0287 7.30292 13.217L10.9029 16.717Z" fill="black" />
        </svg>
      </button>
    </div>
  )
}

export default SignIn
