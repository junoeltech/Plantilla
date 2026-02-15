import Container from '@shared/components/Container'
import styles from '../styles/cafe.module.css'

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <Container>
        <div>
          <strong>CaféPlace</strong>
          <p className={styles.muted}>
            Calle Principal 123 · 7:00 - 20:00
          </p>
        </div>
      </Container>
    </footer>
  )
}
