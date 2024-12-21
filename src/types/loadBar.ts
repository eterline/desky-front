interface LoadBarProps {
    loadType: "load-1" | "load-5" | "load-15";

    upperValue:     number;
    actualValue?:   number;

    color?: string;
}