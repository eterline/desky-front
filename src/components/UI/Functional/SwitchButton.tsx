import { ReactNode, FC } from "react";
import "./SwitchButton.css"
import { UiIcons } from "../../../assets";

interface SwitchButtonProps {
    content?: string

    showIcon?: boolean

    switcherFunc: () => void

    width?: string
    height?: string

    bgColor?: string
    textColor?: string
}

const SwitchButton: FC<SwitchButtonProps> = ({switcherFunc, content, width, height, bgColor, textColor, showIcon}) => {

    const buttonStyle = {
        width: width ?? "100px",
        height: height ?? "50px",

        backgroundColor: bgColor ?? 'black',

        color: textColor ?? 'aliceblue',

        border: 'none'
    };

    return (<div className="SwitchButton" style={buttonStyle} onClick={switcherFunc}>

        { showIcon ? ( <img src={UiIcons[content] ?? UiIcons["alert-circle"]} alt='button' />) : (content ?? 'button') }

    </div>);

};

export default SwitchButton;