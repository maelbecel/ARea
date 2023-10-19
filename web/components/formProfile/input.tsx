interface InputProps {
    placeholder : string
    secureMode ?: boolean
    label       : string
    onChangeFunction : (value: string) => void
    value       : string
}

const Input = ({placeholder, secureMode, label, value, onChangeFunction} : InputProps) => {

    return (
        <div className="flex flex-col">
            <label className="text-[#363841] font-bold text-[28px]">{label}</label>            
                <input className="bg-gray-100 text-[#363841] font-bold text-[18px] rounded-md py-[12px] pl-[10px]"
                    type={secureMode ? "password" : "text"}
                    name="name"
                    value={value}
                    onChange={(e) => onChangeFunction(e.target.value)}
                    placeholder={placeholder}
                />
        </div>
    )
}

export default Input;