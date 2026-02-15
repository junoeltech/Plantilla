import Container from '@shared/components/Container'
import Button from '@shared/components/Button'
import styles from '../styles/cafe.module.css'

export default function ReservationSection() {
  return (
    <section id="reservas" className={styles.reservationSection}>
      <Container>
        <div className={styles.reservationGrid}>

          <div>
            <h2>Reservaciones</h2>
            <p className={styles.muted}>
              Reserva una mesa o solicita espacio para eventos.
            </p>
          </div>

          <form className={styles.reservationForm}>
            <input placeholder="Nombre" />
            <input type="tel" placeholder="Teléfono" />
            <input type="date" />
            <input type="time" />
            <Button>Reservar</Button>
          </form>

        </div>
      </Container>
    </section>
  )
}
