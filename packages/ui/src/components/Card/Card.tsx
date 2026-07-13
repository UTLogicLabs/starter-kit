import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn.js'

export type CardVariant = 'surface' | 'outlined'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
}

export function Card({ variant = 'surface', className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-6',
        variant === 'surface' ? 'bg-surface' : 'bg-transparent border border-border',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
