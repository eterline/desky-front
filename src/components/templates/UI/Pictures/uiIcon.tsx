import IconsUI from "../../../assets/icons";
import { ErrorMessage } from "../../UI/Dialog/errorMessage";

interface UIIconProps {
    name: string;
}

export const IconUI = (props: UIIconProps) => {

    const IconSrc = IconsUI[props.name];

    return IconSrc ? (
        <img
                src={IconSrc}
                alt={props.name}
        />
    ) : (
        <ErrorMessage 
            text={"Icon not found"}
            type="notice"
        />
    );
};