import { useEffect, useRef, useState } from 'react'
import Container from '@shared/components/Container'
import Button from '@shared/components/Button'
import styles from '../styles/cafe.module.css'

const navItems = [
  { id: 'menuPreview', label: 'Menú' },
  { id: 'reservas', label: 'Reservas' },
  { id: 'contact', label: 'Contacto' },
]

export default function Header() {
  const headerRef = useRef(null)
  const navRef = useRef(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const [activeId, setActiveId] = useState(null)

  function onNavClick(e, targetId) {
    e.preventDefault()
    const target = document.getElementById(targetId)
    const headerEl = headerRef.current
    if (!target) return
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0
    const scrollTo = window.pageYOffset + target.getBoundingClientRect().top - headerHeight - 12 // small gap
    window.scrollTo({ top: scrollTo, behavior: 'smooth' })
    setActiveId(targetId)
    moveIndicatorTo(targetId)
  }

  function moveIndicatorTo(id) {
    if (!navRef.current) return setIndicatorStyle(s => ({ ...s, opacity: 0 }))
    const link = navRef.current.querySelector(`[data-section="${id}"]`)
    if (!link) return setIndicatorStyle(s => ({ ...s, opacity: 0 }))
    const navRect = navRef.current.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    const left = linkRect.left - navRect.left + navRef.current.scrollLeft
    const width = linkRect.width
    setIndicatorStyle({ left, width, opacity: 1 })
  }

  useEffect(() => {
    function onResize() {
      if (activeId) moveIndicatorTo(activeId)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeId])

  useEffect(() => {
    const sections = navItems
      .map(n => document.getElementById(n.id))
      .filter(Boolean)

    if (!sections.length) return

    const headerEl = headerRef.current
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActiveId(id)
            moveIndicatorTo(id)
          }
        })
      },
      {
        root: null,
        rootMargin: `-${headerHeight + 12}px 0px -40% 0px`, 
        threshold: [0.4, 0.6],
      }
    )

    sections.forEach(s => observer.observe(s))

    return () => observer.disconnect()
  
  }, [])

  useEffect(() => {
    const initial = activeId || navItems[0].id
    moveIndicatorTo(initial)
  }, [])

  return (
    <header className={styles.header} ref={headerRef}>
      <Container>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            Café<span className={styles.logoAccent}>Place</span>
          </div>

          <nav className={styles.navWrapper} aria-label="Main navigation">
            <div className={styles.nav} ref={navRef}>
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`${styles.navLink} ${activeId === item.id ? styles.active : ''}`}
                  data-section={item.id}
                  onClick={(e) => onNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              ))}

        
              <span
                aria-hidden
                className={styles.navIndicator}
                style={{
                  transform: `translateX(${indicatorStyle.left}px)`,
                  width: indicatorStyle.width ? `${indicatorStyle.width}px` : 0,
                  opacity: indicatorStyle.opacity,
                }}
              />
            </div>
          </nav>

          <div className={styles.headerActions}>
            <Button>Ordenar</Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
