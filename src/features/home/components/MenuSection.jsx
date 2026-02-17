import Container from '@shared/components/Container'
import Card from '@shared/components/Card'
import Button from '@shared/components/Button'
import styles from '../styles/cafe.module.css'

// ✅ Importamos las imágenes desde src/assets

import cappuccinoImg from '../../../assets/coffee-4159024_1280.jpg';
import latteImg from '../../../assets/Coffee-beans-hot-cup-coffee-bag_2560x1600.jpg';
import coldbrewImg from '../../../assets/tipos-de-cafe-social.jpg';


const menuItems = [
  { id: 1, name: 'Cappuccino', price: '$40', desc: 'Espuma cremosa.', img: cappuccinoImg },
  { id: 2, name: 'Latte', price: '$45', desc: 'Leche vaporizada.', img: latteImg },
  { id: 3, name: 'Cold Brew', price: '$55', desc: 'Infusión lenta.', img: coldbrewImg }
]

export default function MenuSection() {
  return (
    <section id="menu" className={styles.menuSection}>
      <Container>
        <h2>Menú</h2>
        <div className={styles.menuGrid}>
          {menuItems.map(item => (
            <Card key={item.id} className={styles.menuCard}>
              <div className={styles.menuMedia}>
                <img src={item.img} alt={item.name} className={styles.menuImg} />
              </div>
              <div>
                <h3>
                  {item.name}
                  <span className={styles.menuPrice}>{item.price}</span>
                </h3>
                <p className={styles.muted}>{item.desc}</p>
                <div className={styles.menuActions}>
                  <Button variant="ghost">Ver</Button>
                  <Button>Agregar</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
