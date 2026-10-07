import Link from 'next/link'

const card: React.CSSProperties = {
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 12,
  padding: '18px 20px',
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
}

export const Welcome = () => (
  <section style={{ marginBottom: 32 }}>
    <h2 style={{ margin: '0 0 6px' }}>Welcome to the NanoPocket Ventures CMS</h2>
    <p style={{ margin: '0 0 18px', opacity: 0.75, maxWidth: 720 }}>
      Every word on the website is editable here. Open <strong>Pages → Home</strong> and use{' '}
      <strong>Live Preview</strong> to watch changes appear as you type. Form submissions arrive
      under <strong>Submissions</strong>.
    </p>
    <div
      style={{
        display: 'grid',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
      }}
    >
      <Link href="/admin/collections/pages" style={card}>
        <strong>Edit website sections</strong>
        <div style={{ opacity: 0.7, fontSize: 13, marginTop: 4 }}>Hero, thesis, team, forms…</div>
      </Link>
      <Link href="/admin/collections/pitch-submissions" style={card}>
        <strong>Founder pitches</strong>
        <div style={{ opacity: 0.7, fontSize: 13, marginTop: 4 }}>Applications & private decks</div>
      </Link>
      <Link href="/admin/collections/enquiries" style={card}>
        <strong>Enquiries</strong>
        <div style={{ opacity: 0.7, fontSize: 13, marginTop: 4 }}>
          Investor, partner & media messages
        </div>
      </Link>
      <Link href="/admin/globals/header" style={card}>
        <strong>Header, menu & footer</strong>
        <div style={{ opacity: 0.7, fontSize: 13, marginTop: 4 }}>
          Buttons, links, fund information
        </div>
      </Link>
    </div>
  </section>
)
