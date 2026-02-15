import { useState } from 'react'
import Container from '@shared/components/Container'
import Button from '@shared/components/Button'
import styles from '../styles/cafe.module.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState({ sending: false, ok: null, error: null })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ sending: true, ok: null, error: null })

    // validación básica
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ sending: false, ok: null, error: 'Por favor completa los campos obligatorios.' })
      return
    }

    try {
      // Ejemplo: enviar a tu API. Cambia la URL por la de tu backend.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Error en el servidor')

      setStatus({ sending: false, ok: 'Mensaje enviado. ¡Te responderemos pronto!', error: null })
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus({ sending: false, ok: null, error: 'No se pudo enviar. Intenta más tarde.' })
    }
  }

  return (
    <section id="contact" className={styles.contactSection}>
      <Container>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <h2>Contacto</h2>
            <p className={styles.muted}>
              ¿Tienes preguntas o quieres hacer una reservación grande? Escríbenos y te contactamos.
            </p>

            <div className={styles.contactMeta}>
              <div><strong>Dirección:</strong> Calle Principal 123</div>
              <div><strong>Tel:</strong> (55) 1234 5678</div>
              <div><strong>Email:</strong> info@cafeplace.com</div>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit} aria-label="Formulario de contacto">
            <label>
              <span className={styles.srOnly}>Nombre</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nombre"
                required
                aria-required="true"
              />
            </label>

            <label>
              <span className={styles.srOnly}>Correo electrónico</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Correo"
                required
                aria-required="true"
              />
            </label>

            <label>
              <span className={styles.srOnly}>Teléfono</span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Teléfono (opcional)"
              />
            </label>

            <label>
              <span className={styles.srOnly}>Mensaje</span>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                placeholder="Mensaje"
                required
                aria-required="true"
              />
            </label>

            <div className={styles.formActions}>
              <Button type="submit" disabled={status.sending}>
                {status.sending ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
              <Button variant="ghost" type="button" onClick={() => setForm({ name:'', email:'', phone:'', message:'' })}>
                Limpiar
              </Button>
            </div>

            {status.ok && <div className={styles.successMessage} role="status">{status.ok}</div>}
            {status.error && <div className={styles.errorMessage} role="alert">{status.error}</div>}
          </form>
        </div>
      </Container>
    </section>
  )
}
