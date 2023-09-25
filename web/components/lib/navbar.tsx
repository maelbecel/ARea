import NavBarBox from './navbar_components/navbarbox'
import SignIn from './navbar_components/sign_in_button'
import SearchBar from './navbar_components/searchbar'
import GameButton from './navbar_components/game_button'

const NavBar = () => {
    return (
    <div className="w-full h-[52px] bg-mainbg border-b-[1px] border-navbarborder flex">
        <div className="w-full h-full flex items-center">
            <GameButton /> {/* Game */}

            <SearchBar divSize="w-[280px]" background='bg-mainbg' weight='w-[256px]' height='h-[32px]' svg_height='24' svg_weight='24' id='searchbarNav' text='text-xs font-[roboto] font-medium' /> {/* Search Bar */}

            <div className="h-full"> {/* Version */}
                <button className="w-[69.69px] h-full bg-mainbg font-[roboto] text-sm text-medium text-white justify-center items-center
                                   hover:bg-dark-violet hidden xl:block">
                    v1.0.10
                </button>
                <button className="w-[48px] h-full bg-mainbg flex justify-center items-center
                                   hover:bg-dark-violet xl:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 9C12.5523 9 13 9.44772 13 10V11H14C14.5523 11 15 11.4477 15 12C15 12.5523 14.5523 13 14 13H13V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V13H10C9.44772 13 9 12.5523 9 12C9 11.4477 9.44772 11 10 11H11V10C11 9.44772 11.4477 9 12 9Z" fill="white" />
                        <path d="M13.648 2.28785C13.9482 2.11598 14.4904 1.87358 15.1009 2.07664L15.1085 2.07917C15.7063 2.28337 16.0074 2.78531 16.159 3.11152C16.32 3.4579 16.4254 3.85758 16.5051 4.16988L16.5446 4.32568C16.6142 4.60139 16.6696 4.82045 16.7371 5.01005C16.7634 5.08367 16.7855 5.13462 16.8018 5.16838C16.8332 5.17283 16.8774 5.17745 16.9371 5.18019C17.1245 5.18877 17.3348 5.17674 17.6083 5.16111L17.757 5.15271C18.0626 5.13583 18.467 5.11662 18.8409 5.17087C19.2041 5.22357 19.7563 5.37567 20.1147 5.89186C20.4692 6.39701 20.4286 6.96772 20.3673 7.31685C20.302 7.68817 20.163 8.07231 20.0529 8.37077L20.0082 8.49148C19.9058 8.76792 19.8245 8.98744 19.7719 9.18851C19.7451 9.29087 19.7348 9.35724 19.7307 9.39539C19.7538 9.41986 19.7927 9.45773 19.8548 9.50916C19.9977 9.62729 20.167 9.74202 20.3845 9.88945C20.4331 9.92238 20.4843 9.9571 20.538 9.99369C20.7975 10.1707 21.1325 10.4046 21.4015 10.6806C21.6662 10.9523 22 11.399 22 12.0099C22 12.6209 21.6662 13.0676 21.4015 13.3392C21.1325 13.6153 20.7975 13.8491 20.538 14.0262C20.4843 14.0628 20.4332 14.0975 20.3845 14.1304C20.167 14.2779 19.9977 14.3926 19.8548 14.5107C19.7974 14.5583 19.7598 14.5942 19.7362 14.6187C19.7412 14.659 19.7524 14.7254 19.7788 14.8245C19.831 15.0205 19.9089 15.2317 20.0063 15.4958L20.0607 15.6436C20.1705 15.943 20.3076 16.3269 20.3709 16.7005C20.4315 17.0571 20.4644 17.6201 20.1184 18.1227C19.7601 18.6432 19.2053 18.7961 18.8409 18.849C18.467 18.9033 18.0626 18.884 17.757 18.8672L17.6083 18.8588C17.3348 18.8431 17.1245 18.8311 16.9371 18.8397C16.8769 18.8425 16.8325 18.8471 16.801 18.8516C16.7848 18.885 16.7626 18.9356 16.7364 19.0087C16.6691 19.1965 16.6139 19.4131 16.5443 19.6864L16.5046 19.8419C16.425 20.1518 16.3193 20.5493 16.1578 20.8942C16.005 21.2203 15.7036 21.7176 15.1085 21.9208L15.1013 21.9233L15.0941 21.9256C14.4867 22.1228 13.9485 21.8881 13.6415 21.713C13.3175 21.5282 13.0078 21.2674 12.7732 21.0679L12.6896 20.9967C12.4652 20.8055 12.2918 20.6577 12.1272 20.5454C12.0712 20.5072 12.029 20.4823 11.9993 20.4663C11.969 20.4824 11.9256 20.5078 11.8677 20.547C11.6999 20.6608 11.5224 20.8113 11.2935 21.0054L11.2179 21.0694C10.9828 21.2683 10.6733 21.5282 10.352 21.7122C10.053 21.8834 9.51356 22.1246 8.90584 21.9256C8.3004 21.7306 7.9951 21.2278 7.84285 20.9039C7.68062 20.5587 7.57474 20.1593 7.49517 19.8484L7.45447 19.6884C7.38525 19.4155 7.33019 19.1984 7.26298 19.0099C7.23672 18.9362 7.21454 18.8853 7.19827 18.8515C7.16684 18.847 7.12263 18.8424 7.06287 18.8397C6.87547 18.8311 6.66521 18.8431 6.39174 18.8588L6.24302 18.8672C5.9374 18.884 5.53297 18.9033 5.15909 18.849C4.79593 18.7963 4.24374 18.6442 3.88531 18.1281C3.53078 17.6229 3.57137 17.0522 3.63272 16.703C3.69796 16.3317 3.83696 15.9476 3.94709 15.6491L3.99175 15.5284C4.09418 15.2519 4.17549 15.0325 4.22814 14.8314C4.25494 14.729 4.26518 14.6626 4.26933 14.6245C4.24618 14.6 4.20733 14.5622 4.14515 14.5107C4.00234 14.3926 3.83304 14.2779 3.6155 14.1304C3.56683 14.0975 3.51575 14.0628 3.46202 14.0262C3.20246 13.8491 2.86752 13.6153 2.59851 13.3392C2.33377 13.0676 2 12.6209 2 12.0099C2 11.3988 2.33393 10.952 2.59934 10.6801C2.86903 10.4037 3.20478 10.17 3.4661 9.99252C3.52356 9.95351 3.57804 9.91679 3.62985 9.88186C3.84466 9.73707 4.01353 9.62325 4.15768 9.50543C4.21729 9.45671 4.25666 9.41958 4.28183 9.3939C4.27643 9.35307 4.26504 9.28877 4.24016 9.19537C4.18796 8.99935 4.11008 8.78823 4.01262 8.52406L3.95822 8.37627C3.84844 8.07685 3.71137 7.69302 3.648 7.31942C3.5875 6.96276 3.55454 6.39976 3.90053 5.89719C4.25885 5.37672 4.81361 5.22375 5.17804 5.17087C5.55191 5.11662 5.95634 5.13583 6.26197 5.15271L6.41062 5.16111C6.68413 5.17674 6.89441 5.18877 7.08181 5.18019C7.1362 5.17769 7.1777 5.17365 7.20842 5.16958C7.22398 5.13555 7.24433 5.08645 7.26805 5.01803C7.33287 4.83102 7.386 4.61718 7.45243 4.34978C7.46643 4.2934 7.48103 4.23464 7.49646 4.17325C7.57525 3.85962 7.67994 3.45963 7.84091 3.1124C7.99249 2.78545 8.29353 2.28344 8.89151 2.0792L8.89869 2.07675L8.9059 2.07441C9.51328 1.87718 10.0515 2.1119 10.3585 2.28702C10.6825 2.47182 10.9922 2.73265 11.2268 2.93212L11.3104 3.00334C11.5348 3.19458 11.7082 3.34229 11.8728 3.45462C11.9288 3.49285 11.971 3.51772 12.0007 3.53368C12.031 3.51756 12.0744 3.49225 12.1323 3.45301C12.3001 3.33918 12.4776 3.18868 12.7065 2.99462L12.7821 2.93057C13.0172 2.73166 13.3267 2.47184 13.648 2.28785ZM13.255 5.10813C12.978 5.29606 12.5321 5.55605 12 5.55605C11.4667 5.55605 11.0215 5.29507 10.7453 5.10652C10.4849 4.92884 10.223 4.70502 10.0126 4.52522L9.9311 4.45566C9.78987 4.33555 9.67347 4.23953 9.57443 4.16456C9.53119 4.29599 9.48679 4.45911 9.43617 4.66058C9.42475 4.70606 9.41288 4.75407 9.40054 4.80399C9.33461 5.07067 9.25522 5.39185 9.15774 5.67306C9.05167 5.97908 8.85659 6.45621 8.44627 6.77597L8.43553 6.78434C8.01145 7.10564 7.50105 7.16308 7.17332 7.17809C6.87288 7.19185 6.54238 7.17245 6.27659 7.15686L6.15171 7.14966C5.94423 7.13821 5.78202 7.13279 5.65323 7.13601C5.69134 7.281 5.75244 7.45994 5.83599 7.68783L5.88229 7.81327C5.97808 8.07195 6.09423 8.38567 6.1728 8.68065C6.25944 9.00598 6.35602 9.49398 6.21563 9.98112L6.21091 9.9975L6.20563 10.0137C6.04564 10.5053 5.67603 10.8475 5.42337 11.054C5.20006 11.2365 4.93435 11.4151 4.71614 11.5618C4.67204 11.5915 4.62915 11.6203 4.58969 11.6471C4.37121 11.7954 4.21267 11.9108 4.10101 12.0102C4.21261 12.1097 4.37089 12.2252 4.58904 12.374C4.62686 12.3998 4.66715 12.427 4.70926 12.4554C4.92793 12.6032 5.19557 12.7841 5.41991 12.9696C5.67022 13.1767 6.03974 13.5234 6.19193 14.0228C6.34351 14.5149 6.24885 15.0098 6.16292 15.338C6.08301 15.6431 5.96292 15.9661 5.86462 16.2304L5.82343 16.3415C5.74104 16.5648 5.67992 16.7408 5.64064 16.884C5.7684 16.8869 5.92868 16.8815 6.13276 16.8702L6.25765 16.863C6.52343 16.8474 6.85393 16.828 7.15437 16.8418C7.48211 16.8568 7.99245 16.9143 8.41653 17.2356C8.8347 17.5525 9.03643 18.0286 9.14682 18.3382C9.24887 18.6244 9.33109 18.9503 9.39884 19.2188C9.41056 19.2653 9.42184 19.31 9.43272 19.3525C9.48273 19.5479 9.52632 19.7061 9.56831 19.8337C9.66769 19.7585 9.78441 19.6625 9.92581 19.5428L10.0037 19.4767C10.2165 19.2958 10.4814 19.0707 10.745 18.8919C11.022 18.7039 11.4679 18.4439 12 18.4439C12.5333 18.4439 12.9785 18.7049 13.2547 18.8935C13.5151 19.0712 13.777 19.295 13.9874 19.4748L14.0689 19.5443C14.2111 19.6653 14.3282 19.7618 14.4277 19.837C14.4711 19.7068 14.5159 19.5449 14.5675 19.3442L14.6008 19.2132C14.6687 18.9452 14.7512 18.6197 14.8538 18.3337C14.9647 18.0243 15.1667 17.5514 15.5835 17.2356C16.0075 16.9143 16.5179 16.8568 16.8456 16.8418C17.1461 16.828 17.4766 16.8474 17.7424 16.863L17.8672 16.8702C18.0747 16.8817 18.2369 16.8871 18.3657 16.8839C18.3276 16.7389 18.2665 16.5599 18.183 16.3321L18.1367 16.2066C18.0409 15.9479 17.9247 15.6342 17.8462 15.3392C17.7595 15.0139 17.6629 14.5259 17.8033 14.0388L17.8069 14.0263C17.9584 13.5251 18.3292 13.1772 18.5801 12.9696C18.8044 12.784 19.0721 12.6032 19.2908 12.4554C19.3326 12.4272 19.3734 12.3996 19.411 12.374C19.6293 12.225 19.7876 12.1095 19.8992 12.0099C19.7876 11.9104 19.6293 11.7948 19.411 11.6459C19.3734 11.6203 19.3333 11.5932 19.2915 11.5649C19.0728 11.4172 18.8044 11.2358 18.5801 11.0503C18.3298 10.8432 17.9603 10.4965 17.8081 9.99712C17.6565 9.50494 17.7512 9.01011 17.8371 8.68192C17.917 8.37675 18.0371 8.0538 18.1354 7.78947L18.1766 7.67842C18.259 7.45513 18.3201 7.27906 18.3594 7.13586C18.2316 7.13297 18.0713 7.1384 17.8672 7.14966L17.7424 7.15686C17.4766 7.17245 17.1461 7.19185 16.8456 7.17809C16.5179 7.16308 16.0075 7.10557 15.5835 6.78426C15.1652 6.46736 14.9635 5.99115 14.8531 5.68104C14.7506 5.39342 14.6683 5.06589 14.6003 4.7957L14.567 4.66395C14.5159 4.46314 14.4712 4.30049 14.4279 4.16915C14.3293 4.24395 14.2138 4.33905 14.0742 4.4572L13.9963 4.52328C13.7835 4.70422 13.5186 4.92935 13.255 5.10813Z" fill="white" />
                    </svg>
                </button>
            </div>

            <div className="h-full"> {/* Community */}
                <button className="w-[98.34px] h-full bg-mainbg font-[roboto] text-sm text-medium text-white justify-center items-center
                                   hover:bg-dark-violet hidden xl:block">
                    Community
                </button>
                <button className="w-[48px] h-full bg-mainbg flex justify-center items-center
                                   hover:bg-dark-violet xl:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8.99207 6C8.99207 7.65685 7.64892 9 5.99207 9C4.33521 9 2.99207 7.65685 2.99207 6C2.99207 4.34315 4.33521 3 5.99207 3C7.64892 3 8.99207 4.34315 8.99207 6ZM6.99207 6C6.99207 6.55228 6.54435 7 5.99207 7C5.43978 7 4.99207 6.55228 4.99207 6C4.99207 5.44772 5.43978 5 5.99207 5C6.54435 5 6.99207 5.44772 6.99207 6Z" fill="white" />
                        <path d="M3.38952 12.6353C4.25221 12.2061 5.36277 11.9682 6.31216 11.9682C6.86445 11.9682 7.31216 11.5205 7.31216 10.9682C7.31216 10.416 6.86445 9.96825 6.31216 9.96825C5.08199 9.96825 3.66247 10.2657 2.4987 10.8447C1.43413 11.3743 0 12.4596 0 14.2717C0 15.219 0.42363 16.0094 1.13783 16.5226C1.74775 16.9609 2.46465 17.1224 3.0169 17.1973C3.56418 17.2716 4.06802 16.8881 4.14227 16.3408C4.21653 15.7936 3.83307 15.2897 3.2858 15.2155C2.84856 15.1561 2.51882 15.0522 2.30494 14.8985C2.11254 14.7602 2 14.5738 2 14.2717C2 13.6519 2.50178 13.0769 3.38952 12.6353Z" fill="white" />
                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" fill="white" />
                        <path d="M12 16C10.8317 16 9.4847 16.2862 8.37943 16.8438C7.36687 17.3547 6 18.4038 6 20.1532C6 21.0663 6.4028 21.8341 7.09004 22.3349C7.67638 22.7622 8.36406 22.9185 8.88862 22.9907L8.95645 23H15.0435L15.1114 22.9907C15.6359 22.9185 16.3236 22.7622 16.91 22.3349C17.5972 21.8341 18 21.0663 18 20.1532C18 18.4038 16.6331 17.3547 15.6206 16.8438C14.5153 16.2862 13.1683 16 12 16ZM9.28031 18.6295C10.0824 18.2248 11.1168 18 12 18C12.8832 18 13.9176 18.2248 14.7197 18.6295C15.5447 19.0457 16 19.5814 16 20.1532C16 20.4328 15.8981 20.5975 15.7321 20.7186C15.5531 20.849 15.2771 20.9429 14.9031 21H9.0969C8.72295 20.9429 8.44689 20.849 8.26794 20.7186C8.10186 20.5975 8 20.4328 8 20.1532C8 19.5814 8.45529 19.0457 9.28031 18.6295Z" fill="white" />
                        <path d="M17.4335 9C19.0903 9 20.4335 7.65685 20.4335 6C20.4335 4.34315 19.0903 3 17.4335 3C15.7766 3 14.4335 4.34315 14.4335 6C14.4335 7.65685 15.7766 9 17.4335 9ZM17.4335 7C17.9858 7 18.4335 6.55228 18.4335 6C18.4335 5.44772 17.9858 5 17.4335 5C16.8812 5 16.4335 5.44772 16.4335 6C16.4335 6.55228 16.8812 7 17.4335 7Z" fill="white" />
                        <path d="M16.7535 10.9682C16.7535 10.416 17.2013 9.96825 17.7535 9.96825C18.9837 9.96825 20.4032 10.2657 21.567 10.8447C22.6316 11.3743 24.0657 12.4596 24.0657 14.2717C24.0657 15.219 23.6421 16.0094 22.9279 16.5226C22.318 16.9609 21.6011 17.1224 21.0488 17.1973C20.5015 17.2716 19.9977 16.8881 19.9234 16.3408C19.8492 15.7936 20.2326 15.2897 20.7799 15.2155C21.2171 15.1561 21.5469 15.0522 21.7608 14.8985C21.9532 14.7602 22.0657 14.5738 22.0657 14.2717C22.0657 13.6519 21.5639 13.0769 20.6762 12.6353C19.8135 12.2061 18.7029 11.9682 17.7535 11.9682C17.2013 11.9682 16.7535 11.5205 16.7535 10.9682Z" fill="white" />
                    </svg>
                </button>
            </div>

            <button className="w-[48px] h-full bg-mainbg flex justify-center items-center
                            hover:bg-dark-violet">
                <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z" fill="white" />
                    <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="white" />
                    <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill="white" />
                </svg>
            </button> {/* divers */}
        </div>

        <div className="w-full h-full flex items-center justify-end mr-[12px]">
            <SignIn /> {/* Sign In Button */}

            <NavBarBox> {/* Support */}
                <svg className="text-gray" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.449 8.5413C10.1605 8.85589 9.99864 9.29759 10 9.7663C10.0016 10.3186 9.55523 10.7676 9.00294 10.7692C8.45066 10.7708 8.00164 10.3244 8.00002 9.77216C7.99733 8.85625 8.31117 7.91334 8.97505 7.18947C9.65345 6.44978 10.6421 6 11.8542 6C13.1515 6 14.3303 6.68216 15.0058 7.64809C15.702 8.64351 15.9051 10.0242 15.0569 11.2586C14.5895 11.9388 13.9512 12.4074 13.5364 12.7119C13.432 12.7885 13.3418 12.8547 13.2721 12.9113C13.0681 13.0767 12.9585 13.199 12.8901 13.3216C12.8277 13.4333 12.7652 13.607 12.7652 13.9231V14.3846C12.7652 14.9369 12.3175 15.3846 11.7652 15.3846C11.2129 15.3846 10.7652 14.9369 10.7652 14.3846V13.9231C10.7652 13.316 10.8922 12.7975 11.1438 12.3467C11.3893 11.9068 11.7183 11.5963 12.0123 11.3579C12.2036 11.2028 12.3717 11.0783 12.5229 10.9664C12.8845 10.6987 13.1501 10.502 13.4085 10.126C13.7053 9.69396 13.6705 9.22846 13.3669 8.79435C13.0427 8.33075 12.4597 8 11.8542 8C11.1635 8 10.723 8.24253 10.449 8.5413Z" fill="white"/><path d="M12.8057 17.1538C12.8057 17.6636 12.3798 18.0769 11.8544 18.0769C11.3289 18.0769 10.903 17.6636 10.903 17.1538C10.903 16.644 11.3289 16.2308 11.8544 16.2308C12.3798 16.2308 12.8057 16.644 12.8057 17.1538Z" fill="white" />
                    <path d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="white" />
                </svg>
            </NavBarBox>
            <NavBarBox> {/* Setting */}
                <svg className="text-gray" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.03823 12.0502C8.03823 9.84018 9.84806 8.03196 12.0601 8.03196C14.2721 8.03196 16.0819 9.84018 16.0819 12.0502C16.0819 14.2603 14.2721 16.0685 12.0601 16.0685C9.84806 16.0685 8.03823 14.2603 8.03823 12.0502ZM10.0492 12.0502C10.0492 13.1553 10.9541 14.0594 12.0601 14.0594C13.1661 14.0594 14.071 13.1553 14.071 12.0502C14.071 10.9452 13.1661 10.0411 12.0601 10.0411C10.9541 10.0411 10.0492 10.9452 10.0492 12.0502Z" fill="white" />
                    <path d="M21.2098 9.03653C21.813 9.23744 22.3158 9.73973 22.6174 10.242C22.9191 10.7443 23.1201 11.4475 22.9191 11.9498C22.9191 12.5525 22.718 13.2557 22.4163 13.758C22.1147 14.2603 21.612 14.6621 21.0087 14.9635L20.2043 15.3653L20.5059 16.169C20.707 16.6712 20.8076 17.274 20.707 17.7763C20.6065 18.2785 20.4054 18.8813 20.1038 19.2831C19.8543 19.6985 19.4673 19.9765 19.1133 20.2307C19.0393 20.2839 18.9668 20.336 18.8972 20.3881C18.495 20.6895 17.8917 20.79 17.389 20.79C16.9868 20.79 16.5847 20.6895 16.1825 20.589L15.3781 20.2877L14.9759 21.0913C14.7748 21.6941 14.2721 22.1963 13.7694 22.4977C13.2666 22.7991 12.5628 23 11.9595 23C11.3562 23 10.6524 22.8995 10.1497 22.4977C9.64697 22.1963 9.24478 21.6941 8.94314 21.0913L8.64151 20.3881L7.83714 20.6895C7.43495 20.79 7.03277 20.8904 6.63058 20.8904C6.02731 20.8904 5.52458 20.79 5.02184 20.4886C4.51911 20.1872 4.11693 19.7854 3.81529 19.3836C3.51365 18.9817 3.31256 18.379 3.21201 17.8767C3.11147 17.3744 3.21201 16.7717 3.41311 16.2694L3.71475 15.4658L2.91038 15.0639C2.3071 14.863 1.80437 14.3607 1.50273 13.8584C1.20109 13.3562 1 12.653 1 12.0502C1 11.4475 1.20109 10.7443 1.60328 10.1416C1.90492 9.63927 2.40765 9.23744 3.01092 8.93607L3.71475 8.6347L3.41311 7.83105C3.21201 7.32877 3.11147 6.72603 3.21201 6.22374C3.31256 5.72146 3.51365 5.11872 3.81529 4.71689C4.06476 4.30148 4.45178 4.0235 4.80571 3.76928C4.87972 3.71612 4.95229 3.66399 5.02184 3.61187C5.52458 3.41096 6.02731 3.21005 6.63058 3.21005C7.03277 3.21005 7.43495 3.3105 7.83714 3.41096L8.64151 3.71233L8.94314 3.00913C9.24478 2.40639 9.64697 1.90411 10.2502 1.50228C10.753 1.20091 11.4568 1 12.0601 1C12.6634 1 13.3672 1.20091 13.9704 1.60274C14.4732 1.90411 14.8754 2.40639 15.177 3.00913L15.4786 3.71233L16.283 3.41096C16.6852 3.3105 17.0874 3.21005 17.4896 3.21005C18.0928 3.21005 18.5956 3.3105 19.0983 3.61187C19.601 3.91324 20.0032 4.31507 20.3049 4.71689C20.6065 5.11872 20.8076 5.72146 20.9081 6.22374C21.0087 6.72603 20.9081 7.32877 20.707 7.83105L20.4054 8.6347L21.2098 9.03653ZM20.3049 13.2557C20.6065 13.1553 20.8076 12.9543 20.9081 12.7534C21.0087 12.5525 21.1092 12.3516 21.1092 11.9498C21.1092 11.7489 21.0087 11.4475 20.9081 11.2466C20.707 11.0457 20.5059 10.8447 20.3049 10.7443L19.3999 10.3425C18.9978 10.1416 18.6961 9.73973 18.495 9.3379C18.2939 8.93607 18.2939 8.43379 18.495 8.03196L18.8972 7.0274C18.9978 6.82648 18.9978 6.62557 18.9978 6.42466C18.9978 6.22374 18.8972 6.02283 18.7967 5.82192C18.6961 5.72146 18.495 5.52054 18.2939 5.42009C18.0928 5.31963 17.8917 5.21918 17.6907 5.21918C17.4896 5.21918 17.389 5.21918 17.1879 5.31963L16.1825 5.72146C15.9814 5.82192 15.6797 5.82192 15.4786 5.82192C15.0765 5.82192 14.7748 5.72146 14.4732 5.52055C14.1715 5.31963 13.8699 5.01826 13.7694 4.71689L13.3672 3.81279C13.2666 3.51142 13.0655 3.3105 12.8644 3.21005C12.6634 3.10959 12.3617 3.00913 12.0601 3.00913C11.7584 3.00913 11.5573 3.10959 11.4568 3.21005C11.2557 3.41096 11.0546 3.61187 10.9541 3.81279L10.5519 4.71689C10.3508 5.01826 10.1497 5.31963 9.84806 5.52055C9.54642 5.72146 9.14424 5.82192 8.8426 5.82192C8.54096 5.82192 8.33987 5.82192 8.13877 5.72146L7.13331 5.31963C6.93222 5.21918 6.83168 5.21918 6.63058 5.21918C6.42949 5.21918 6.2284 5.31963 6.02731 5.42009C5.82622 5.52055 5.62512 5.621 5.42403 5.82192C5.32348 6.02283 5.22294 6.22374 5.22294 6.42466V7.12785L5.62512 8.13242C5.82621 8.53425 5.82621 9.03653 5.62512 9.43836C5.42403 9.94064 5.12239 10.242 4.72021 10.4429L3.81529 10.8447C3.51365 10.9452 3.31256 11.1461 3.21201 11.347C3.11147 11.5479 3.01092 11.7489 3.01092 12.0502C3.01092 12.3516 3.11147 12.5525 3.31256 12.7534C3.51365 12.9543 3.71475 13.1553 3.91584 13.2557L4.82075 13.6575C5.22294 13.8584 5.52458 14.2603 5.72567 14.6621C5.82621 15.0639 5.92676 15.5662 5.72567 15.968L5.32348 16.9726C5.22294 17.1735 5.22294 17.3744 5.22294 17.5753C5.22294 17.7763 5.32348 17.9772 5.42403 18.1781C5.52458 18.2785 5.72567 18.4795 5.92676 18.5799C6.12785 18.6804 6.32894 18.7808 6.53004 18.7808C6.73113 18.7808 6.83168 18.7808 7.03277 18.6804L8.03823 18.2785C8.23932 18.1781 8.54096 18.1781 8.74205 18.1781C9.14424 18.1781 9.44587 18.2785 9.74751 18.4795C10.0492 18.6804 10.3508 18.9817 10.4513 19.2831L10.8535 20.1872C10.9541 20.4886 11.1552 20.6895 11.3563 20.79C11.5573 20.8904 11.859 20.9909 12.0601 20.9909C12.3617 20.9909 12.6634 20.8904 12.8644 20.79C13.0655 20.589 13.2666 20.3881 13.3672 20.1872L13.7694 19.2831C13.9704 18.9817 14.1715 18.6804 14.4732 18.4795C14.7748 18.2785 15.177 18.1781 15.4786 18.1781C15.7803 18.1781 15.9814 18.1781 16.1825 18.2785L17.1879 18.6804C17.389 18.7808 17.4896 18.7808 17.6907 18.7808C17.8917 18.7808 18.0928 18.6804 18.2939 18.5799C18.495 18.4795 18.6961 18.379 18.7967 18.1781C18.8972 17.9772 18.9978 17.7763 18.9978 17.5753C18.9978 17.3744 18.9978 17.1735 18.8972 16.9726L18.495 15.968C18.2939 15.5662 18.2939 15.0639 18.495 14.6621C18.6961 14.1598 18.9978 13.8584 19.3999 13.6575L20.3049 13.2557Z" fill="white" />
                </svg>
            </NavBarBox>
            <NavBarBox> {/* Langue */}
                <svg className="text-gray" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.0001 2C10.5524 2 11.0001 2.44772 11.0001 3V4H13.9773C13.9926 3.99965 14.0079 3.99964 14.0233 4H17C17.5523 4 18 4.44772 18 5C18 5.55228 17.5523 6 17 6H14.6671C13.4239 8.87973 11.6933 11.4366 9.96936 13.5249C10.467 14.0518 11.0395 14.6253 11.7071 15.2929C12.0976 15.6834 12.0976 16.3166 11.7071 16.7071C11.3166 17.0976 10.6834 17.0976 10.2929 16.7071L10.2379 16.6521C9.65305 16.0673 9.12637 15.5406 8.64912 15.0404C7.032 16.8009 5.53751 18.0969 4.6 18.8C4.15817 19.1314 3.53137 19.0418 3.2 18.6C2.86863 18.1582 2.95817 17.5314 3.4 17.2C4.29151 16.5314 5.74733 15.2621 7.31506 13.5355C6.35293 12.335 5.64409 11.0946 5.05132 9.31623C4.87667 8.79228 5.15983 8.22596 5.68377 8.05132C6.20772 7.87667 6.77404 8.15983 6.94868 8.68377C7.40384 10.0492 7.91521 11.0232 8.64363 11.9867C10.0293 10.2747 11.4041 8.2478 12.4716 6H3C2.44772 6 2 5.55228 2 5C2 4.44772 2.44772 4 3 4H9.00011V3C9.00011 2.44772 9.44783 2 10.0001 2Z" fill="white" />
                    <path d="M17.1298 10.071C17.2181 10.0358 17.3117 10.013 17.4076 10.004C17.4597 9.99917 17.5116 9.99846 17.563 10.0017C17.6692 10.0085 17.7728 10.0322 17.8702 10.071C18.0001 10.1227 18.1136 10.199 18.2071 10.2925C18.3008 10.3861 18.3772 10.4997 18.429 10.6298C18.4354 10.6458 18.4414 10.6621 18.4469 10.6784L21.9439 20.6696C22.1263 21.1909 21.8516 21.7614 21.3304 21.9439C20.8091 22.1263 20.2386 21.8516 20.0561 21.3304L19.2405 19H16C15.9204 19 15.8431 18.9907 15.7689 18.9732L14.9439 21.3304C14.7614 21.8516 14.1909 22.1263 13.6696 21.9439C13.1484 21.7614 12.8737 21.1909 13.0561 20.6696L16.5531 10.6785C16.5586 10.6621 16.5646 10.6458 16.571 10.6298C16.6227 10.4998 16.6991 10.3863 16.7927 10.2927C16.8863 10.1991 16.9998 10.1227 17.1298 10.071ZM17.5 14.0271L16.4595 17H18.5405L17.5 14.0271Z" fill="white" />
                </svg>
            </NavBarBox>
        </div>
    </div>
    )
}

export default NavBar
