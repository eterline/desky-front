import { FC, useEffect, useState } from "react";
import CircleBar from "./CircleBar";
import './LoadingContainer.css'


const LoadingContainer: FC = () => {

    const [load, setLoad] = useState<number>(0);
    const [direction, setDirection] = useState<1 | -1>(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoad((prev) => {
                if (prev >= 100 && direction === 1) {
                    setDirection(-1);
                    return prev - 1;
                } else if (prev <= 0 && direction === -1) {
                    setDirection(1);
                    return prev + 1;
                }
                return prev + direction;
            });
        }, 10);

        return () => clearInterval(interval);
    }, [direction]);

    return (
        <div className='LoadingContainer'>
            <CircleBar 
                size={120}
                max={100}
                value={load}
                strokeWidth={15}
                centerText={'Load...'}
            />
        </div>
    );
};

export default LoadingContainer;