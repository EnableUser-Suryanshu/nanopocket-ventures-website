'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import { Marquee } from '@/components/motion/Marquee'
import { useMotion } from '@/components/providers/MotionProvider'
import { LinkedInIcon } from '@/components/ui/Icons'
import { SmartLink } from '@/components/ui/SmartLink'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import type { TeamBlock, TeamMember } from '@/payload-types'
import { mediaSrc } from '@/lib/media-src'

import { SectionHeader } from './SectionHeader'
import { sectionProps } from './section-props'
import styles from './Team.module.css'

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')

type Face = { kind: 'member'; member: TeamMember } | { kind: 'phrase'; text: string }

/**
 * Team Responsible — prokit’s review moment: a giant marquee band with a 3D cube in front that turns
 * one face per scroll step. Faces: team members first, then the fund’s principles.
 */
export function Team({
  block,
  index,
  team,
}: {
  block: TeamBlock
  index?: number
  team: TeamMember[]
}) {
  const ref = useRef<HTMLElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)
  const { reduced } = useMotion()
  const [active, setActive] = useState(0)
  const headingId = `${block.anchorId}-title`
  const selected = (block.members || []).filter(
    (m): m is TeamMember => typeof m === 'object' && m !== null,
  )
  const members = selected.length ? selected : team
  const phrases = (block.marquee || []).map((p) => p.text)

  const faces: Face[] = [
    ...members.slice(0, 3).map((member) => ({ kind: 'member' as const, member })),
    ...phrases.map((text) => ({ kind: 'phrase' as const, text })),
  ].slice(0, 4)

  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced || faces.length < 2) return
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        const steps = faces.length - 1
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: q('[data-scene]')[0],
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.9,
              onUpdate: (self) => setActive(Math.round(self.progress * steps)),
            },
          })
          .fromTo(q('[data-cube]'), { rotateY: 0 }, { rotateY: -90 * steps, duration: 1 }, 0)
          // Tilt lives on a wrapper so it stays in the viewer’s frame (on the cube it would turn with each face)
          .fromTo(q('[data-tilt]'), { rotateX: -10 }, { rotateX: 10, duration: 1 }, 0)
        // Entrance on the stage: opacity on a preserve-3d element would flatten the cube mid-fade
        gsap.from(q('[data-stage]'), {
          scale: 0.6,
          opacity: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: q('[data-scene]')[0], start: 'top 70%', once: true },
        })
      })
      mm.add('(max-width: 899px)', () => {
        gsap.from(q('[data-face]'), {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: q('[data-scene]')[0], start: 'top 75%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [reduced, faces.length], revertOnUpdate: true },
  )

  // Keyboard users: turn the cube to the face that holds focus.
  const focusFace = (i: number | null) => {
    const cube = cubeRef.current
    if (!cube) return
    if (i === null) {
      delete cube.dataset.focus
    } else {
      cube.dataset.focus = ''
      cube.style.setProperty('--focus-rot', `${-90 * i}deg`)
    }
  }

  return (
    <section
      {...sectionProps(block, cn('section', styles.team))}
      ref={ref}
      aria-labelledby={headingId}
    >
      <div className="container">
        <SectionHeader
          id={headingId}
          eyebrow={block.eyebrow}
          title={block.title}
          tagline={block.tagline}
          index={index}
        />
      </div>

      <div className={styles.scene} data-scene="">
        <div className={styles.sticky}>
          {phrases.length > 0 && (
            <div className={styles.band} aria-hidden="true">
              <Marquee speed={40} scrollLinked>
                {phrases.map((p, i) => (
                  <span key={i} className={styles.bandItem}>
                    {p}
                    <span className={styles.bandSquare} />
                  </span>
                ))}
              </Marquee>
            </div>
          )}

          <div className={styles.stage} data-stage="">
            <div className={styles.tilt} data-tilt="">
              <div
                className={styles.cube}
                ref={cubeRef}
                data-cube=""
                style={{ '--faces': faces.length } as React.CSSProperties}
              >
                <span className={cn(styles.cap, styles.capTop)} aria-hidden="true" />
                <span className={cn(styles.cap, styles.capBottom)} aria-hidden="true" />
                {faces.map((face, i) => {
                  if (face.kind === 'phrase') {
                    return (
                      <div
                        key={`p-${i}`}
                        className={cn(styles.face, styles.phrase)}
                        style={{ '--i': i } as React.CSSProperties}
                        data-face=""
                        aria-hidden="true"
                      >
                        <span className={styles.faceIndex}>
                          {String(i + 1).padStart(2, '0')} / {String(faces.length).padStart(2, '0')}
                        </span>
                        <span className={styles.phraseText}>{face.text}</span>
                        <span className={styles.faceFoot}>{block.tagline}</span>
                      </div>
                    )
                  }
                  const m = face.member
                  const photo = m.photo && typeof m.photo === 'object' ? m.photo : null
                  return (
                    <article
                      key={m.id}
                      className={cn(styles.face, styles.member, photo?.url && styles.withPhoto)}
                      style={{ '--i': i } as React.CSSProperties}
                      data-face=""
                      onFocus={() => focusFace(i)}
                      onBlur={() => focusFace(null)}
                    >
                      {photo?.url ? (
                        // Portrait framed in the logo’s seed shape — nothing covers the face
                        <div className={styles.portrait}>
                          <Image
                            src={mediaSrc(photo.url)}
                            alt={
                              photo.alt && photo.alt.toLowerCase() !== 'decorative' ? photo.alt : ''
                            }
                            fill
                            sizes="(max-width: 900px) 45vw, 200px"
                            className={styles.photo}
                            style={{
                              objectPosition: `${photo.focalX ?? 50}% ${photo.focalY ?? 35}%`,
                            }}
                          />
                        </div>
                      ) : (
                        <div className={styles.avatar}>
                          <span className={styles.initials} aria-hidden="true">
                            {initials(m.name)}
                          </span>
                        </div>
                      )}
                      <div className={styles.body}>
                        <h3 className={styles.name}>{m.name}</h3>
                        <p className={styles.role}>{m.role}</p>
                        {m.bio && <p className={styles.bio}>{m.bio}</p>}
                      </div>
                      {m.linkedin && (
                        <SmartLink href={m.linkedin} newTab className={styles.linkedin}>
                          <LinkedInIcon className={styles.linkedinIcon} />
                          <span>
                            {block.linkedinLabel || 'LinkedIn'}
                            <span className="sr-only"> — {m.name}</span>
                          </span>
                        </SmartLink>
                      )}
                    </article>
                  )
                })}
              </div>
            </div>
          </div>

          {faces.length > 1 && (
            <ol className={styles.dots} aria-hidden="true">
              {faces.map((_, i) => (
                <li key={i} className={cn(styles.dot, i === active && styles.dotOn)} />
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  )
}
