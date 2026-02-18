import { useRef } from 'react'
import Container from '@shared/components/Container'
import Button from '@shared/components/Button'
import Card from '@shared/components/Card'
import useInView from '@shared/hooks/useInView'
import styles from '../styles/cafe.module.css'

// ✅ Importamos las imágenes desde src/assets

import cappuccinoImg from '../../../assets/coffee-4159024_1280.jpg';
import latteImg from '../../../assets/Coffee-beans-hot-cup-coffee-bag_2560x1600.jpg';
import coldbrewImg from '../../../assets/tipos-de-cafe-social.jpg';


const items = [
  { id:1, name:'Cappuccino', price:'$40', desc:'Espuma cremosa y espresso.', img: cappuccinoImg },
  { id:2, name:'Latte', price:'$45', desc:'Leche vaporizada y espresso.', img: latteImg },
  { id:3, name:'Cold Brew', price:'$55', desc:'Infusión lenta y refrescante.', img: coldbrewImg },
  // add more
]

export default function MenuSection(){
  const ref = useRef(null)
  const visible = useInView(ref)
  return (
    <section id="menu" className={`${styles.section} ${styles.menuSection}`} ref={ref}>
      <div className={styles.ambient} />
      <Container>
        <h2 className={`${styles.reveal} ${visible ? styles.isVisible : ''}`}>Menú</h2>
        <p className={`${styles.reveal} ${visible ? styles.isVisible : ''}`}>Selección curada de bebidas y bocados.</p>
        <div className={styles.menuGrid}>
          {items.map(it => (
            <article key={it.id} className={`${styles.menuCard} ${styles.reveal} ${visible ? styles.isVisible : ''}`}>
              <div className={styles.menuThumb} aria-hidden>
                <img src={`/assets/menu-${it.id}.jpg`} alt={it.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              </div>

              <div className={styles.menuBody}>
                <h3>{it.name} <span className={styles.menuPrice}>{it.price}</span></h3>
                <p className={styles.muted}>{it.desc}</p>

                <div className={styles.menuActions}>
                  <Button variant="ghost">Ver</Button>
                  <Button onClick={() => alert(`Agregado: ${it.name}`)}>Agregar</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
