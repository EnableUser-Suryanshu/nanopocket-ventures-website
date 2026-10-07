import { cn } from '@/lib/cn'

import { ArrowUpRight } from './Icons'
import { SmartLink } from './SmartLink'

type Props = {
  label: string
  href?: string | null
  newTab?: boolean | null
  variant?: 'solid' | 'outline' | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: boolean
  onNavigate?: () => void
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

/** Brand pill button: black, red wipe on hover, rolling label (prokit “button-slide”). */
export function Button({
  label,
  href,
  newTab,
  variant = 'solid',
  size = 'md',
  className,
  icon,
  onNavigate,
  ...buttonProps
}: Props) {
  const classes = cn(
    'btn',
    `btn--${variant || 'solid'}`,
    size !== 'md' && `btn--${size}`,
    className,
  )
  const showIcon = icon ?? Boolean(newTab)
  const inner = (
    <>
      <span className="btn__roll" aria-hidden="true">
        <span>{label}</span>
        <span>{label}</span>
      </span>
      <span className="sr-only">{label}</span>
      {showIcon && <ArrowUpRight className="btn__icon" />}
    </>
  )

  if (href) {
    return (
      <SmartLink href={href} newTab={newTab} className={classes} onNavigate={onNavigate}>
        {inner}
      </SmartLink>
    )
  }
  return (
    <button className={classes} type={buttonProps.type || 'button'} {...buttonProps}>
      {inner}
    </button>
  )
}
