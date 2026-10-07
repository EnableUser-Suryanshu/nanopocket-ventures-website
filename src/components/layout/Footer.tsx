import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight, LinkedInIcon } from '@/components/ui/Icons'
import { RollText } from '@/components/ui/RollText'
import { SmartLink } from '@/components/ui/SmartLink'
import type { Footer as FooterData, Header as HeaderData, SiteSetting } from '@/payload-types'

import { BackToTop } from './BackToTop'
import styles from './Footer.module.css'
import { FooterMotion } from './FooterMotion'
import { FooterWordmark } from './FooterWordmark'
import { LocalTime } from './LocalTime'
import { MotionToggle } from './MotionToggle'

type LinkItem = { label: string; href: string; newTab?: boolean | null; id?: string | null }

function Heading({ index, id, children }: { index: number; id?: string; children: string }) {
  return (
    <h2 className={styles.heading} id={id}>
      <span className={styles.num} aria-hidden="true">
        ({String(index).padStart(2, '0')})
      </span>
      {children}
    </h2>
  )
}

function LinkColumn({
  index,
  heading,
  links,
}: {
  index: number
  heading?: string | null
  links?: LinkItem[] | null
}) {
  if (!links?.length) return null
  return (
    <nav className={styles.col} aria-label={heading || undefined} data-f-item="">
      {heading && <Heading index={index}>{heading}</Heading>}
      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l.id || l.href + l.label}>
            <SmartLink href={l.href} newTab={l.newTab} className={styles.link}>
              <RollText>{l.label}</RollText>
              {l.newTab && <ArrowUpRight className={styles.ext} />}
            </SmartLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * Groups sentences into lines; short neighbours share a line (“Small Bets. Superior Solutions.”).
 * On phones every sentence gets its own line (CSS).
 */
function statementLines(text?: string | null, maxChars = 32) {
  const sentences = (text?.match(/[^.!?]+[.!?]*/g) || []).map((s) => s.trim()).filter(Boolean)
  return sentences.reduce<string[][]>((lines, sentence) => {
    const last = lines[lines.length - 1]
    if (last && [...last, sentence].join(' ').length <= maxChars) last.push(sentence)
    else lines.push([sentence])
    return lines
  }, [])
}

export function Footer({
  footer,
  header,
  site,
}: {
  footer: FooterData
  header?: HeaderData | null
  site: SiteSetting
}) {
  const fund = footer.fund
  const address = footer.address
  const lines = statementLines(footer.centerText)
  const buttons = footer.showButtons === false ? [] : header?.buttons || []
  const clock = footer.localTime
  let column = 0

  return (
    <footer className={`${styles.footer} theme-dark`}>
      <FooterMotion />

      <div className={`container ${styles.top}`}>
        <div className={styles.brand} data-f-reveal="">
          <SmartLink href="/" className={styles.logo} aria-label={site.siteName} data-f-item="">
            <Logo variant="reverse" layout="landscape" title="" />
          </SmartLink>
          {footer.tagline && (
            <p className={styles.tagline} data-f-item="">
              {footer.tagline}
            </p>
          )}
          {clock?.show !== false && (
            <div data-f-item="">
              <LocalTime label={clock?.label} suffix={clock?.suffix} />
            </div>
          )}
        </div>

        <div className={styles.lead}>
          {lines.length > 0 && (
            <p className={styles.statement} data-f-statement="">
              {lines.map((line, i) => (
                <span key={i} className={styles.line}>
                  <span className={styles.lineText} data-f-line="">
                    {line.map((sentence, j) => (
                      <span key={j} className={styles.sentence}>
                        {sentence}{' '}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </p>
          )}
          {buttons.length > 0 && (
            <div className={styles.buttons} data-f-reveal="">
              {buttons.map((b) => (
                <span key={b.id || b.href} className={styles.button} data-f-item="">
                  <Button label={b.label} href={b.href} newTab={b.newTab} size="lg" />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`container ${styles.grid}`} data-f-reveal="">
        {fund?.items?.length ? (
          <section className={styles.col} aria-labelledby="footer-fund" data-f-item="">
            {fund.heading && (
              <Heading index={++column} id="footer-fund">
                {fund.heading}
              </Heading>
            )}
            {fund.subheading && <p className={styles.sub}>{fund.subheading}</p>}
            <dl className={styles.facts}>
              {fund.items.map((item) => (
                <div key={item.id || item.label} className={styles.fact}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <LinkColumn
          index={++column}
          heading={footer.navigate?.heading}
          links={footer.navigate?.links}
        />
        <LinkColumn
          index={++column}
          heading={footer.access?.heading}
          links={footer.access?.links}
        />

        {address && (
          <section className={styles.col} aria-labelledby="footer-address" data-f-item="">
            {address.heading && (
              <Heading index={++column} id="footer-address">
                {address.heading}
              </Heading>
            )}
            {address.lines && <address className={styles.address}>{address.lines}</address>}
            <div className={styles.stack}>
              {address.mapUrl && (
                <SmartLink href={address.mapUrl} newTab className="line-link">
                  {address.mapLabel || 'View on Google Maps'}
                  <ArrowUpRight className={styles.ext} />
                </SmartLink>
              )}
              {site.linkedinUrl && (
                <SmartLink href={site.linkedinUrl} newTab className="line-link">
                  <LinkedInIcon className={styles.ext} />
                  {address.linkedinLabel || 'LinkedIn'}
                </SmartLink>
              )}
            </div>
          </section>
        )}
      </div>

      {footer.disclaimer && (
        <div className="container">
          <div className={styles.fine}>
            <p className={styles.disclaimer}>{footer.disclaimer}</p>
          </div>
        </div>
      )}

      <div className={`container ${styles.bar}`}>
        <p className={styles.copy}>{footer.copyright}</p>
        <div className={styles.legal}>
          {footer.legalLinks?.map((l) => (
            <SmartLink
              key={l.id || l.href}
              href={l.href}
              newTab={l.newTab}
              className={styles.legalLink}
            >
              <RollText>{l.label}</RollText>
            </SmartLink>
          ))}
          <MotionToggle tone="dark" />
          <BackToTop />
        </div>
      </div>

      {footer.showWordmark !== false && <FooterWordmark />}
    </footer>
  )
}
