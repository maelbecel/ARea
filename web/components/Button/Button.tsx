import { useState } from "react";

interface ButtonProps {
    callBack        ?: () => void; // The function to call when the button is clicked
    text             : string;     // The text to display on the button
    backgroundColor ?: string;     // The background color of the button {default: #ffffff}, when the button is clicked, the color become the textColor
    textColor       ?: string;     // The text color of the button {default: #363841}, when the button is clicked, the color become the backgroundColor
    size            ?: boolean;    // The size (height) of the button {default: false}, { false: little, true: big }
    half            ?: number;    // The size (width)   of the button {default: 0}, { 0: full, 1: quarter, 2: half, 3: three-quarter }
};

const Button = ({ callBack, text, backgroundColor, textColor, size = false, half = 0 }: ButtonProps) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const styles = {
        default: {
            backgroundColor: backgroundColor,
            color: textColor,
            height: size ? '100px' : '50px',
            fontSize: size ? '36px' : '24px',
            width: (half === 0 ? '100%' : (half === 1 ? '25%' : (half === 2 ? '50%' : (half === 4 ? '12%' : '75%'))))
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
             className={`rounded-[50px] flex justify-center items-center font-bold transition-colors duration-200 cursor-pointer`}
             onClick={handleClick}
        >
            {text}
        </div>
    )
}

export default Button;
