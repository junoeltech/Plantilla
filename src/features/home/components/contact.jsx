import { useState, useRef } from "react";
import Container from "@shared/components/Container";
import Button from "@shared/components/Button";
import useInView from "@shared/hooks/useInView"; // Importante para la animación
import styles from "../../../styles/contacto.module.css";

import CoffeContact from "../../../assets/cafe-contacto.webp";

const INITIAL_FORM = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const ref = useRef(null);
  const isVisible = useInView(ref);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({
    sending: false,
    ok: null,
    error: null,
  });

  const revealClass = `${styles.reveal} ${isVisible ? styles.isVisible : ""}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setStatus({ sending: false, ok: null, error: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... tu lógica de envío (se mantiene igual)
  };

  return (
    <section id="contact" className={styles.contactSection} ref={ref}>
      <Container>
        <div className={styles.contactGrid}>
          {/* LADO IZQUIERDO MEJORADO */}
          <div className={`${styles.contactInfo} ${revealClass}`}>
            <span className={styles.badge}>Hablemos</span>
            <h2>¿Te apetece un café?</h2>
            <p className={styles.muted}>
              Ya sea para una reservación o solo para saludar, estamos a un
              mensaje de distancia.
            </p>

            <div className={styles.imageWrapper}>
              <img src={CoffeContact} alt="Café" className={styles.cupImg} />
            </div>

            <div className={styles.contactMeta}>
              <div className={styles.metaCard}>
                <span className={styles.icon}>📍</span>
                <div>
                  <strong>Ubicación</strong>
                  <p>Huamantla, Tlaxcala</p>
                </div>
              </div>
              <div className={styles.metaCard}>
                <span className={styles.icon}>📱</span>
                <div>
                  <strong>WhatsApp</strong>
                  <p>(247) 123 4567</p>
                </div>
              </div>
              <div className={styles.metaCard}>
                <span className={styles.icon}>✉️</span>
                <div>
                  <strong>Email</strong>
                  <p>hola@cafeplace.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORMULARIO CON ANIMACIÓN */}
          <form
            className={`${styles.contactForm} ${revealClass}`}
            onSubmit={handleSubmit}
          >
            <div className={styles.field}>
              <label htmlFor="name">Nombre completo</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Tu mensaje</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                placeholder="¿En qué podemos ayudarte?"
                required
              />
            </div>

            <div className={styles.formActions}>
              <Button
                type="submit"
                disabled={status.sending}
                className={styles.submitBtn}
              >
                {status.sending ? "Enviando..." : "Enviar mensaje"}
              </Button>
              <Button variant="ghost" type="button" onClick={resetForm}>
                Limpiar
              </Button>
            </div>

            {status.ok && (
              <div className={styles.successMessage}>✨ {status.ok}</div>
            )}
            {status.error && (
              <div className={styles.errorMessage}>⚠️ {status.error}</div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
