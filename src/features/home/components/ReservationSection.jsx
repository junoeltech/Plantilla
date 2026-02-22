import { useRef } from 'react'
import Container from '@shared/components/Container'
import Button from '@shared/components/Button'
import useInView from '@shared/hooks/useInView'
import styles from '../styles/cafe.module.css'

export default function ReservationSection(){
  const ref = useRef(null)
  const visible = useInView(ref)

  return (
    <section id="reservas" className={`${styles.reservationSection} ${styles.section}`} ref={ref}>
      <Container>
        <div className={styles.reservationGrid}>
          <div className={`${styles.reveal} ${visible ? styles.isVisible : ''}`}>
            <h2>Reservaciones</h2>
            <p className={styles.muted}>Reserva una mesa o solicita disponibilidad para grupos.</p>
            <ul className={styles.reservationList}>
              <li>Reservas hasta 8 personas</li>
              <li>Pedidos para llevar y eventos</li>
            </ul>

            {/* Variante 1: Información práctica */}
            <p className={styles.extraNote}>
              Reservaciones disponibles todos los días de 9:00 a 22:00.  
              Se recomienda reservar con 24 horas de anticipación.
            </p>

            {/* Variante 2: Frase cálida */}
            <p className={styles.extraNote}>
              ¡Queremos que tu visita sea especial y acogedora, como un buen café compartido!
            </p>

            {/* Variante 3: Testimonio breve */}
            <blockquote className={styles.testimonial}>
              “El mejor lugar para disfrutar un café con amigos.” — Cliente frecuente
            </blockquote>
          </div>

          <form className={`${styles.resForm} ${styles.reveal} ${visible ? styles.isVisible : ''}`} onSubmit={(e)=>{e.preventDefault(); alert('Reserva enviada')}}>
            <div className="fieldWrap">
              <input className={styles.input} placeholder=" " required />
              <label>Nombre</label>
            </div>
            <div className="fieldWrap">
              <input type="tel" className={styles.input} placeholder=" " />
              <label>Teléfono</label>
            </div>

            <div style={{display:'flex', gap:8}}>
              <div style={{flex:1}} className="fieldWrap">
                <input type="date" className={styles.input} placeholder=" " required />
                <label>Fecha</label>
              </div>
              <div style={{width:120}} className="fieldWrap">
                <input type="time" className={styles.input} placeholder=" " required />
                <label>Hora</label>
              </div>
            </div>

            <Button type="submit">Reservar</Button>
          </form>
        </div>
      </Container>
    </section>
  )
}
