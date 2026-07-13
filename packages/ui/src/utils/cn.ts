export type ClassValue = string | number | null | undefined | false

export function cn(...classes: Array<ClassValue>) {
  return classes.filter(Boolean).join(' ')
}
