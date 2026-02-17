import { useRef, useState } from 'react'
import Container from '@shared/components/Container'
import Button from '@shared/components/Button'
import useInView from '@shared/hooks/useInView'
import styles from '../styles/cafe.module.css'

export default function Contact(){
  const ref = useRef(null)
  const visible = useInView(ref)
  const [form, setForm] = useState({name:'', email:'', message:''})

  const handleChange = (e) => setForm(s=>({...s,[e.target.name]:e.target.value}))

  return (
    <section id="contact" className={styles.contactSection} ref={ref}>
      <Container>
        <div className={styles.contactGrid}>
          <div className={`${styles.contactCard} ${styles.reveal} ${visible ? styles.isVisible : ''}`}>
            <h2>Contacto</h2>
            <p className={styles.muted}>¿Tienes preguntas o quieres un evento privado? Escríbenos.</p>
            <div style={{marginTop:12, color:'var(--text-200)'}}>
              <div><strong>Dirección:</strong> Calle Principal 123</div>
              <div><strong>Tel:</strong> (55) 1234 5678</div>
            </div>
          </div>

          <form className={`${styles.contactForm} ${styles.reveal} ${visible ? styles.isVisible : ''}`} onSubmit={(e)=>{e.preventDefault(); alert('Mensaje enviado')}}>
            <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
            <textarea name="message" placeholder="Mensaje" rows={5} value={form.message} onChange={handleChange} required />
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <Button type="submit">Enviar</Button>
              <Button variant="ghost" type="button" onClick={()=>setForm({name:'',email:'',message:''})}>Limpiar</Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}
