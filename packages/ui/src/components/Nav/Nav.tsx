import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn.js'

export interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

export interface NavProps extends HTMLAttributes<HTMLElement> {
  items: Array<NavItem>
  logoSlot?: ReactNode
}

export function Nav({ items, logoSlot, className, ...rest }: NavProps) {
  return (
    <nav
      className={cn(
        'flex items-center gap-6 bg-background border-b border-border px-4 py-3',
        className,
      )}
      {...rest}
    >
      {logoSlot ? <div className="font-display font-bold text-foreground">{logoSlot}</div> : null}
      <ul className="flex gap-4">
        {items.map((item) => {
          return (
            <li key={item.href}>
              <a
                href={item.href}
                className={item.isActive ? 'text-accent font-display' : 'text-foreground/70 hover:text-foreground'}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
