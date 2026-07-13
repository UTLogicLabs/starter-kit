import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn.js'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const baseButtonStyles = 'inline-flex items-center justify-center rounded-md font-display font-bold transition-colors disabled:opacity-50 disabled:pointer-events-none'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-foreground hover:opacity-90',
  secondary: 'bg-secondary text-foreground hover:opacity-90',
  ghost: 'bg-transparent border border-border text-foreground hover:bg-surface',
  danger: 'bg-danger text-foreground hover:opacity-90',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({ variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(baseButtonStyles, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    />
  )
}
