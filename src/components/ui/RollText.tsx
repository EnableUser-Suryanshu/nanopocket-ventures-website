/** Duplicated text that rolls up on hover of the parent link/button. */
export function RollText({ children }: { children: string }) {
  return (
    <>
      <span className="roll" aria-hidden="true">
        <span>{children}</span>
        <span>{children}</span>
      </span>
      <span className="sr-only">{children}</span>
    </>
  )
}
