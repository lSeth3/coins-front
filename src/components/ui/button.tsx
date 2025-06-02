// src/components/ui/button.tsx
'use client'

import { cn } from '@/lib/utils'

export function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}) {
  return (
    <button
      className={cn(
        'rounded-md px-4 py-2 text-sm font-medium transition-colors',
        variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700',
        variant === 'outline' && 'border border-gray-300 bg-white hover:bg-gray-50',
        size === 'sm' && 'px-3 py-1 text-xs',
        className
      )}
      {...props}
    />
  )
}