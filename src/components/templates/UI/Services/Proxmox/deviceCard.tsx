import "./deviceCard.css";

interface VEDevCardProps {
    name: string
    status: "stopped" | "running" | "suspend"
    tags: string

    vmid: number
    cpus: number

    netRX: number
    netTX: number

    uptime: number
    pid: number
}

export const DeviceCard = (props: VEDevCardProps) => {
    return (
        <div>
            
        </div>
    );
};