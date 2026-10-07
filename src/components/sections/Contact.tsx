'use client'

import { EnquiryForms } from '@/components/forms/EnquiryForms'
import { Reveal } from '@/components/motion/Reveal'
import { SplitReveal } from '@/components/motion/SplitReveal'
import { ArrowUpRight } from '@/components/ui/Icons'
import { SmartLink } from '@/components/ui/SmartLink'
import { cn } from '@/lib/cn'
import type { ContactBlock, EnquiryForm } from '@/payload-types'

import styles from './Contact.module.css'
import { Eyebrow } from './Eyebrow'
import { sectionProps } from './section-props'

/** Reach Us — giant title, quick-access links (Invest With Us, Investor Login, LinkedIn) and tabbed forms. */
export function Contact({
  block,
  index,
  config,
}: {
  block: ContactBlock
  index?: number
  config: EnquiryForm
}) {
  const headingId = `${block.anchorId}-title`
  return (
    <section {...sectionProps(block, cn('section', styles.contact))} aria-labelledby={headingId}>
      <div className={cn('container', styles.grid)}>
        <div className={styles.side}>
          <Eyebrow text={block.eyebrow} index={index} />
          <SplitReveal
            as="h2"
            id={headingId}
            text={block.title}
            className={cn('display', styles.title)}
            by="chars"
          />
          {block.tagline && <p className={cn('lead', styles.tagline)}>{block.tagline}</p>}
          {block.intro && <p className={styles.intro}>{block.intro}</p>}

          {block.accessLinks?.length ? (
            <nav className={styles.access} aria-label={block.accessTitle || undefined}>
              {block.accessTitle && <p className={styles.accessTitle}>{block.accessTitle}</p>}
              <Reveal as="ul" className={styles.accessList} stagger="[data-item]">
                {block.accessLinks.map((l) => (
                  <li key={l.id || l.href} data-item="">
                    <SmartLink href={l.href} newTab={l.newTab} className={styles.accessLink}>
                      <span className={styles.accessText}>
                        <span className={styles.accessLabel}>{l.label}</span>
                        {l.description && (
                          <span className={styles.accessDesc}>{l.description}</span>
                        )}
                      </span>
                      <span className={styles.accessIcon} aria-hidden="true">
                        <ArrowUpRight />
                      </span>
                    </SmartLink>
                  </li>
                ))}
              </Reveal>
            </nav>
          ) : null}
        </div>

        <Reveal className={styles.forms} y={50}>
          <EnquiryForms config={config} />
        </Reveal>
      </div>
    </section>
  )
}
