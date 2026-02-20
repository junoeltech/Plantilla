import React from 'react'
import Container from '@shared/components/Container'
import styles from '../styles/cafe.module.css'
import Card from '@shared/components/Card'
import MENU from '../data/menu'

export default function MenuPreview({ previewCount = 6, onOpenCatalog }) {
  const items = MENU.slice(0, previewCount)

  return (
    <section id="menuPreview" className={styles.menuPreview}>
      <Container>

      
        <div className={styles.menuPreviewHeader}>
          <h2>Selección destacada</h2>
          <p className={styles.muted}>
            Una muestra de nuestro catálogo — descubre nuestras bebidas más populares.
          </p>
        </div>

  
        <div className={styles.menuGrid}>
          {items.map(it => (
            <Card key={it.id} className={styles.menuCard}>

          
              <div className={styles.menuThumb}>
                {it.img && <img src={it.img} alt={it.name} />}
              </div>

             
              <div className={styles.menuBody}>
                
                <div className={styles.menuTitleRow}>
                  <h3>{it.name}</h3>
                  <span className={styles.menuPrice}>${it.price}</span>
                </div>

                <p className={styles.muted}>{it.desc}</p>

    
                <div className={styles.menuActions}>
                  <button
                    className="btn btnGlass"
                    onClick={() => alert(`Detalle visual de ${it.name}`)}
                  >
                    Ver detalle
                  </button>
                </div>

              </div>
            </Card>
          ))}
        </div>

       
        <div className={styles.menuPreviewFooter}>
          <button 
            className="btn btnOutline"
            onClick={onOpenCatalog}
          >
            Ver catálogo completo
          </button>
        </div>

      </Container>
    </section>
  )
}