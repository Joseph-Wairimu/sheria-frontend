import { cn } from '@/src/lib/utils/cn';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md border border-gray-200 p-6',
        hover && 'transition-shadow hover:shadow-lg',
        className
      )}
      {...props}
    />
  );
}