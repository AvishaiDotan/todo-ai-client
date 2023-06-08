import { useState } from 'react';

export default function ThreeDimensionsCube() {
    const [rotationClass, setRotationClass] = useState('');

    function setClass(): void {
        const randomClass = getRandomCubeDirectionClass()
        setRotationClass(randomClass)
    }

    return (
        <div className="three-dimensions-cube" onMouseEnter={setClass}>
            <div className={"cube " + rotationClass}>
                <div className="cube__face cube__face--front"></div>
                <div className="cube__face cube__face--back"></div>
                <div className="cube__face cube__face--right"></div>
                <div className="cube__face cube__face--left"></div>
                <div className="cube__face cube__face--top"></div>
                <div className="cube__face cube__face--bottom"></div>
            </div>
        </div>
    )
}

function getRandomCubeDirectionClass(): string {
    const strings = [
        'show-front',
        'show-right',
        'show-back',
        'show-top',
        'show-bottom',
        'show-left'
    ];

    const randomIndex = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
}
