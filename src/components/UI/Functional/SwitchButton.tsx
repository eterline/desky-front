import { ReactNode, FC } from "react";
import "./SwitchButton.css"
import { UiIcons } from "../../../assets";

interface SwitchButtonProps {
    content?: string

    showIcon?: boolean

    show: boolean
    switcherFunc: () => void

    width?: string
    height?: string

    bgColor?: string
    textColor?: string
}

const SwitchButton: FC<SwitchButtonProps> = ({show, switcherFunc, content, width, height, bgColor, textColor, showIcon}) => {

    const buttonStyle = {
        width: width ?? "100px",
        height: height ?? "50px",

        backgroundColor: bgColor ?? 'black',

        color: textColor ?? 'aliceblue',

        border: 'none'
    };

    return (<div className="SwitchButton _phoneVisible _absolutePosit-phone _topIndex-phone" style={buttonStyle} onClick={switcherFunc}>

        { showIcon ? ( <img src={UiIcons[content] ?? UiIcons["alert-circle"]} alt='button' />) : (content ?? 'button') }

    </div>);

};

export default SwitchButton;