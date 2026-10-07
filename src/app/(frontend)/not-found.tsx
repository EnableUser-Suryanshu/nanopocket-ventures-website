import { Button } from '@/components/ui/Button'
import { getGlobals } from '@/lib/queries'

import styles from './page-shell.module.css'

export default async function NotFound() {
  const { site } = await getGlobals()
  return (
    <section className={`container ${styles.notFound}`}>
      <p className="eyebrow">
        <span className="eyebrow__dot" aria-hidden="true" />
        404
      </p>
      <h1 className="display">{site.notFoundTitle || 'Page not found'}</h1>
      <p className={`lead ${styles.notFoundBody}`}>{site.notFoundBody}</p>
      <Button label={site.notFoundCta || 'Return home'} href="/" size="lg" />
    </section>
  )
}
