import "./ErrorMsg.css";
import { FC } from "react";

interface ErrorMsgProps {
    text: string
    type: "alert" | "notice" | "warn"
}

const ErrorMsg: FC<ErrorMsgProps> = ({text, type}) => {

    return (
        <div className={`ErrorMessage err-${type}`}>
            <div>
                Error: {text}
            </div>
        </div>
    );
};

export default ErrorMsg;