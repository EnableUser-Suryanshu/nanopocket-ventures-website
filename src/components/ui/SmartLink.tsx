'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'
import { useSiteLabels } from '@/components/providers/SiteLabels'

export type SmartLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  newTab?: boolean | null
  /** Called after an in-page scroll finishes (e.g. to close the menu). */
  onNavigate?: () => void
}

/**
 * One link component for the whole site:
 *  - #section links smooth-scroll (Lenis) and move focus to the section
 *  - #section links on other pages go to /#section
 *  - external / new-tab links get rel + a screen-reader hint
 */
export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(function SmartLink(
  { href, newTab, onNavigate, onClick, children, ...rest },
  ref,
) {
  const pathname = usePathname()
  const { scrollToTarget } = useMotion()
  const labels = useSiteLabels()
  const isHash = href.startsWith('#')
  const isExternal =
    /^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')

  if (isHash) {
    const onHome = pathname === '/'
    if (!onHome) {
      return (
        <Link ref={ref} href={`/${href}`} onClick={onClick} {...rest}>
          {children}
        </Link>
      )
    }
    return (
      <a
        ref={ref}
        href={href}
        onClick={(e) => {
          onClick?.(e)
          if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return
          const target = document.getElementById(href.slice(1))
          if (!target) return
          e.preventDefault()
          history.pushState(null, '', href)
          window.dispatchEvent(new HashChangeEvent('hashchange'))
          scrollToTarget(target, { onDone: onNavigate })
        }}
        {...rest}
      >
        {children}
      </a>
    )
  }

  if (isExternal || newTab) {
    return (
      <a
        ref={ref}
        href={href}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        {...rest}
      >
        {children}
        {newTab && <span className="sr-only"> {labels.opensNewTab}</span>}
      </a>
    )
  }

  return (
    <Link ref={ref} href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  )
})
