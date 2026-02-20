import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Container from '@shared/components/Container';
import Button from '@shared/components/Button';
import styles from '../styles/cafe.module.css';

import coffeeHero from '../../../assets/coffee-4159024_1280.jpg';
import croissant from '../../../assets/Coffee-beans-hot-cup-coffee-bag_2560x1600.jpg';
import latte from '../../../assets/tipos-de-cafe-social.jpg';

const slides = [
  {
    img: coffeeHero,
    title: "Especial del día",
    desc: "Espresso doble + Croissant"
  },
  {
    img: croissant,
    title: "Latte artesanal",
    desc: "Con leche vaporizada y espuma cremosa"
  },
  {
    img: latte,
    title: "Cold Brew refrescante",
    desc: "Infusión lenta para un sabor suave"
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.heroGrid}>

          <div>
            <h1 className={styles.heroTitle}>
              Tu café perfecto cada mañana
            </h1>
            <p className={styles.heroSub}>
              Ambiente cálido, café artesanal y experiencia única.
            </p>
            <div className={styles.heroCtas}>
              <Button>Ver menú</Button>
              <Button variant="outline">Reservar mesa</Button>
            </div>
          </div>

          <div className={styles.heroMedia}>
            <div className={styles.cupCard}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={slides[index].img}
                  src={slides[index].img}
                  alt="Producto"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className={styles.cupImg}
                />
              </AnimatePresence>

              <div className={styles.cupText}>
                <h4>{slides[index].title}</h4>
                <p className={styles.muted}>{slides[index].desc}</p>
              </div>

              {/* ✅ Botones dentro del cuadro, centrados debajo del texto */}
              <div className={styles.carouselControls}>
                <button className={styles.carouselBtn} onClick={prev}>◀</button>
                <button className={styles.carouselBtn} onClick={next}>▶</button>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
