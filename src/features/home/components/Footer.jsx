import Container from "@shared/components/Container";
import styles from "../../../styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <Container>
        <div className={styles.footerInner}>
          {/* Lado Izquierdo: Marca y Copyright */}
          <div className={styles.footerBrand}>
            <strong>Junoel Tech</strong>
            <div className={styles.smallMuted}>
              © {new Date().getFullYear()} · Hecho con dedicación en Huamantla
            </div>
          </div>

          {/* Lado Derecho: Contacto y Versión */}
          <div className={styles.footerLinks}>
            <a href="mailto:hi@junoel.dev" className={styles.footerEmail}>
              hi@junoel.dev
            </a>
            <span className={styles.kbd}>v0.1</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
