// --- Interface --- //
import { Input } from "../../Interface/interface";

// --- Imports --- //
import { Dispatch, SetStateAction } from "react";

// --- Components --- //
const LabelComponent = ({ label, theme }: { label: string, theme: string }) => {
    return (
        <span className={`text-[24px] font-bold`} style={{ color: (theme === 'light' ? '#363841' : '#ffffff') }}>
            {label}
        </span>
    );
};

const InputsArea = ({ label, type, value, inputs, id, theme, setInputs } : { label: string, type: string, value: string, inputs: Input[], id: number, theme: string, setInputs: Dispatch<SetStateAction<Input[]>> }) => {
    return (
        <div className='flex flex-col w-[90%] lg:w-[50%]'>
            <LabelComponent label={label} theme={theme} />
            <input
                type={type}
                className={`rounded-[10px] p-2 text-[#363841] font-bold text-[20px] border-[#363841] border-2`}
                value={value}
                onChange={(e) => {
                    setInputs(inputs.map((input: Input, index: number) => {
                        if (index === id)
                            input.value = e.target.value;
                        return input;
                    }));
                }}
            />
        </div>
    );
};

// --- Props --- //
interface FieldProps {
    input         : Input;
    theme         : string;
    inputsValue   : Input[];
    id            : number;
    type         ?: string;
    setInputsValue: Dispatch<SetStateAction<Input[]>>;
};

const TextField = ({ input, theme, inputsValue, id, setInputsValue, type = "text" } : FieldProps) => {
    return (
        <InputsArea label={input.label}
                    type={type}
                    value={inputsValue[id].value}
                    inputs={inputsValue}
                    id={id}
                    theme={theme}
                    setInputs={setInputsValue}
        />
    );
};

const SelectField = ({ input, theme, inputsValue, id, setInputsValue } : FieldProps) => {

    /**
     * If the value of the input is undefined or empty, we set the value to the first option
     */
    if (inputsValue[id].value === undefined || inputsValue[id].value === "") {
        setInputsValue(inputsValue.map((input: Input) => {
            if (input.type === "SELECT" && (input.value === undefined || input.value === ""))
                input.value = input.options[0];
            return input;
        }));
    }

    return (
        <div className='flex flex-col w-[90%] lg:w-[50%]'>
            <LabelComponent label={input.label} theme={theme} />
            <select
                className={`rounded-[10px] p-2 text-[#363841] font-bold text-[20px]`}
                value={inputsValue[id].value}
                onChange={(e) => {
                    setInputsValue(inputsValue.map((input: Input, index: number) => {
                        if (index === id)
                            input.value = e.target.value;
                        return input;
                    }));
                }}
            >
                {input.options?.map((option: string, id: number) => {
                    return (
                        <option key={id} value={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export { TextField, SelectField };
