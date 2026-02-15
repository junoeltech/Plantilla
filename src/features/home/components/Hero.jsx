import Container from '@shared/components/Container'
import Button from '@shared/components/Button'
import styles from '../styles/cafe.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.heroGrid}>

          <div>
            <h1 className={styles.heroTitle}>
              Tu café perfecto cada mañana
            </h1>

            <p className={styles.heroSub}>
              Ambiente cálido, café artesanal y experiencia única.
            </p>

            <div className={styles.heroCtas}>
              <Button>Ver menú</Button>
              <Button variant="outline">Reservar mesa</Button>
            </div>
          </div>

          <div className={styles.heroMedia}>
            <div className={styles.cupCard}>
              <img
                src="/assets/coffee-hero.jpg"
                alt="Café especial"
                className={styles.cupImg}
              />
              <div>
                <h4>Especial del día</h4>
                <p className={styles.muted}>
                  Espresso doble + Croissant
                </p>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
