import { useState } from "react";

interface ButtonProps {
    callBack        ?: () => void; // The function to call when the button is clicked
    text             : string;     // The text to display on the button
    backgroundColor ?: string;     // The background color of the button {default: #ffffff}, when the button is clicked, the color become the textColor
    textColor       ?: string;     // The text color of the button {default: #363841}, when the button is clicked, the color become the backgroundColor
    size            ?: boolean;    // The size of the button {default: false},{ false: little, true: big }
};

const Button = ({callBack, text, backgroundColor, textColor, size = false}: ButtonProps) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const styles = {
        default: {
            backgroundColor: backgroundColor,
            color: textColor,
            height: size ? '100px' : '50px',
            fontSize: size ? '36px' : '24px'
        },
        clicked: {
            backgroundColor: textColor,
            color: backgroundColor,
        }
    };

    const handleClick = () => {
        setIsClicked(true);

        setTimeout(() => {
            setIsClicked(false);
        }, 200);

        if (callBack)
            callBack();
    };

    return (
        <div style={{
                ...styles.default,
                ...(isClicked ? styles.clicked : {})
            }}
             className={`rounded-default w-full flex justify-center items-center font-bold transition-colors duration-200 cursor-pointer`}
             onClick={handleClick}
        >
            {text}
        </div>
    )
}

export default Button;
