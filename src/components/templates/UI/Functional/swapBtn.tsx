import { IconUI } from "../Pictures/uiIcon";
import "./swapBtn.css";

interface SwapBtnProps {
    switcher: React.Dispatch<any>;
    state: boolean;
}

export const SwapBtn = (prop: SwapBtnProps) => {
    return (
        <button className="swapBtn" onClick={() => { prop.switcher(!prop.state) }}>
            <IconUI name="arrow-big-left" />
        </button>
    );
};
