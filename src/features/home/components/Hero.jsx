import { useRef } from 'react'
import Container from '@shared/components/Container'
import Button from '@shared/components/Button'
import useInView from '@shared/hooks/useInView'
import styles from '../styles/cafe.module.css'

export default function Hero(){
  const ref = useRef(null)
  const onView = useInView(ref)

  return (
    <section className={styles.hero} ref={ref}>
      <div className={styles.ambient} aria-hidden />
      <Container>
        <div className={styles.heroInner}>
          <div className={`${styles.titleWrap} ${styles.reveal} ${onView ? styles.isVisible : ''}`}>
            <h1 className={styles.heroTitle}>Tu café perfecto cada mañana</h1>
            <p className={styles.heroSub}>Ambiente cálido, café artesanal y experiencia única.</p>

            <div className={styles.heroCtas}>
              <Button onClick={() => document.getElementById('menu')?.scrollIntoView({behavior:'smooth'})}>Ver menú</Button>
              <Button variant="ghost" onClick={() => document.getElementById('reservas')?.scrollIntoView({behavior:'smooth'})}>Reservar</Button>
            </div>
          </div>

          <div className={`${styles.cupCard} ${styles.glass} ${styles.reveal} ${onView ? styles.isVisible : ''}`}>
            <div className={styles.cupRing} />
            <div className={styles.cupFloat}>
              <img src="/assets/coffee-hero.jpg" alt="Café especial" className={styles.cupImg}/>
              <div style={{paddingTop:8}}>
                <strong>Especial del día</strong>
                <div className={styles.smallMuted}>Espresso doble + Croissant</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
