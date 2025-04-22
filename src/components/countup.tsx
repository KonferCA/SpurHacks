import { useEffect, useRef, useState } from 'react';
import { useInView, animate, useMotionValue } from 'motion/react';

type CountUpProps = {
    to: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
    allowDecimal?: boolean;
};

export const CountUp = ({
    to,
    prefix = '',
    suffix = '',
    duration = 2,
    allowDecimal = false,
}: CountUpProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const count = useMotionValue(0);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, to, {
                duration,
                onUpdate: (v) => {
                    const value = allowDecimal
                        ? Number(v.toFixed(1))
                        : Math.floor(v);
                    setDisplay(value);
                },
            });

            return controls.stop;
        }
    }, [isInView, to, duration, count, allowDecimal]);

    return (
        <span ref={ref}>
            {prefix}
            {display.toLocaleString()}
            {suffix}
        </span>
    );
};
