import Container from '@shared/components/Container'
import styles from '../styles/cafe.module.css'

export default function Footer(){
  return (
    <footer className={styles.siteFooter}>
      <Container>
        <div className={styles.footerInner}>
          <div>
            <strong>Junoel Tech</strong>
            <div className={styles.smallMuted}>© {new Date().getFullYear()} · Built with care</div>
          </div>

          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <a href="mailto:hi@junoel.dev" className={styles.smallMuted}>hi@junoel.dev</a>
            <div className={styles.kbd}>v0.1</div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
