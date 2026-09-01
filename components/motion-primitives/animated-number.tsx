'use client';
import { cn } from '@/lib/utils';
import {
  motion,
  MotionValue,
  SpringOptions,
  useSpring,
  useTransform,
} from 'motion/react';
import { useEffect } from 'react';

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: keyof React.JSX.IntrinsicElements;
  /** Formate la valeur arrondie affichée à chaque étape de l'animation. */
  format?: (value: number) => string;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = 'span',
  format = (n) => Math.round(n).toLocaleString(),
}: AnimatedNumberProps) {
  const MotionComponent = motion.create(as) as React.ComponentType<
    Omit<React.HTMLAttributes<HTMLElement>, 'children'> & {
      children?: MotionValue<string>;
    }
  >;

  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) => format(Math.round(current)));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <MotionComponent className={cn('tabular-nums', className)}>
      {display}
    </MotionComponent>
  );
}
