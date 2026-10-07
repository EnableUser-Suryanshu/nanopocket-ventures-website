import { Reveal } from '@/components/motion/Reveal'
import { SplitReveal } from '@/components/motion/SplitReveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

import { Eyebrow } from './Eyebrow'
import styles from './SectionHeader.module.css'

type Cta = {
  label: string
  href: string
  newTab?: boolean | null
  variant?: 'solid' | 'outline' | null
  id?: string | null
}

type Props = {
  id: string
  eyebrow?: string | null
  title: string
  tagline?: string | null
  index?: number
  ctas?: Cta[] | null
  className?: string
  align?: 'split' | 'stack'
  children?: React.ReactNode
}

/** Shared section opener: (01) label, oversized title with masked reveal, tagline and buttons. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  tagline,
  index,
  ctas,
  className,
  align = 'split',
  children,
}: Props) {
  return (
    <header className={cn(styles.header, align === 'stack' && styles.stack, className)}>
      <div className={styles.titleCol}>
        <Eyebrow text={eyebrow} index={index} />
        <SplitReveal
          as="h2"
          id={id}
          text={title}
          className={cn('display', styles.title)}
          by="chars"
        />
      </div>
      {(tagline || ctas?.length || children) && (
        <Reveal className={styles.side} stagger="[data-item]" delay={0.2}>
          {tagline && (
            <p className={cn('lead', styles.tagline)} data-item="">
              {tagline}
            </p>
          )}
          {children}
          {ctas?.length ? (
            <div className={styles.ctas} data-item="">
              {ctas.map((c) => (
                <Button
                  key={c.id || c.label}
                  label={c.label}
                  href={c.href}
                  newTab={c.newTab}
                  variant={c.variant}
                />
              ))}
            </div>
          ) : null}
        </Reveal>
      )}
    </header>
  )
}
