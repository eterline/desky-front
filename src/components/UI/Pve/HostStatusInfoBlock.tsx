import { FC } from "react";
import './HostStatus.css';

interface HostStatusInfoBlockProps {
    child: Map<string, string>
    header: string
}

const HostStatusInfoBlock: FC<HostStatusInfoBlockProps> = ({child, header}) => {
    return (
        <div className="HostStatus-info_block">
            <h2>{header}</h2>

            <div className="HostStatus-info_block-text">
                {Array.from(child.entries()).map(([key, value], index) => (
                    <span key={`${key}-${index}`}>
                        <strong>{key}:</strong> {value?.toString() ?? "undefined"}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default HostStatusInfoBlock;