import React from 'react';

interface CircleBarProps {
    value: number;
    max?: number;
    size: number;
    strokeWidth: number;
    fillColor?: string;
    emptyColor?: string;
    centerText?: string;
    textColor?: string;
}

const CircleBar: React.FC<CircleBarProps> = ({
    value,
    size,
    strokeWidth,
    fillColor,
    emptyColor,
    centerText,
    max,
    textColor
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / (max ?? 100)) * circumference;

    return (
        <svg className='CircleBar' width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
            {/* Empty field */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={emptyColor ?? 'black'}
                strokeWidth={strokeWidth}
                fill="none"
            />
            {/* Filled field */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={fillColor ?? 'white'}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`} // Поворот на -90 градусов, чтобы начать с верхней точки
            />
            {/* Number at Center */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="20"
                fontWeight="bold"
                fill={textColor ?? 'white'}
                color={textColor ?? 'white'}
            >
                {centerText ?? 'bar'}
            </text>
        </svg>
    );
};

export default CircleBar;