import Container from '@shared/components/Container'
import Button from '@shared/components/Button'
import styles from '../styles/cafe.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerInner}>
          
          <div className={styles.logo}>
            Café<span>Place</span>
          </div>

          <nav className={styles.nav}>
            <a href="#menu">Menú</a>
            <a href="#reservas">Reservas</a>
            <a href="#contact">Contacto</a>
            <Button>Ordenar</Button>
          </nav>

        </div>
      </Container>
    </header>
  )
}
