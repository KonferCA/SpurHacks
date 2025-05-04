import { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

export const CountUp = ({
    to,
    prefix = '',
    suffix = '',
    duration = 1500,
    allowDecimal = false,
}: {
    to: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
    allowDecimal?: boolean;
}) => {
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const startTime = useRef<number | null>(null);
    const frameId = useRef<number | null>(null);

    useEffect(() => {
        if (!isInView) return;

        const animate = (timestamp: number) => {
            if (!startTime.current) {
                startTime.current = timestamp;
            }

            const progress: number = timestamp - startTime.current;

            const percentage: number = Math.min(progress / duration, 1);
            const easedPercentage: number = easeOutQuad(percentage);
            const currentValue: number = to * easedPercentage;

            setValue(
                allowDecimal
                    ? Number(currentValue.toFixed(1))
                    : Math.floor(currentValue)
            );

            if (percentage < 1) {
                frameId.current = requestAnimationFrame(animate);
            }
        };

        frameId.current = requestAnimationFrame(animate);

        return () => {
            if (frameId.current) {
                cancelAnimationFrame(frameId.current);
            }
        };
    }, [isInView, to, duration, allowDecimal]);

    const easeOutQuad = (t: number): number => t * (2 - t);

    return (
        <span ref={ref} style={{ fontWeight: '800' }}>
            {prefix}
            {value.toLocaleString()}
            {suffix}
        </span>
    );
};
