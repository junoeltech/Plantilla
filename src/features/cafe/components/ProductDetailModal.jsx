// src/features/cafe/components/ProductDetailModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/cafe.module.css';

export default function ProductDetailModal({ item, onClose }) {
  // -- Referencias --
  const backdropRef = useRef(null);
  const dialogRef = useRef(null);

  // -- Estados --
  const [mainImg, setMainImg] = useState(null);
  const [size, setSize] = useState('M');
  const [isFav, setIsFav] = useState(false);

  // -- Efectos --
  // 1. Sincronizar estado cuando el item cambia
  useEffect(() => {
    if (!item) return;

    setMainImg(item.img || null);
    setSize(item.sizes?.[0] || 'M');

    // Inicializar el estado de "favorito" correctamente
    try {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFav(favs.includes(item.id));
    } catch (error) {
      console.error('Error leyendo favoritos:', error);
    }

    // Auto-focus para accesibilidad (con limpieza de timeout)
    const timer = setTimeout(() => dialogRef.current?.focus(), 40);
    return () => clearTimeout(timer);
  }, [item]);

  // 2. Cerrar con la tecla Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!item) return null;

  // -- Manejadores de Eventos (Handlers) --
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  const toggleFavorite = () => {
    try {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      let nextFavs;

      if (favs.includes(item.id)) {
        nextFavs = favs.filter((id) => id !== item.id);
        setIsFav(false);
      } else {
        nextFavs = [...favs, item.id];
        setIsFav(true);
      }

      localStorage.setItem('favorites', JSON.stringify(nextFavs));
    } catch (error) {
      console.error('Error al guardar favorito:', error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: item.name,
      text: `${item.name} — ${item.desc}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('El usuario canceló o hubo un error al compartir:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
      } catch (error) {
        alert('No se pudo compartir. Copia el enlace manualmente.');
      }
    }
  };

  // -- Renderizado Condicional Limpio --
  const hasGallery = (item.gallery?.length > 0) || item.img;

  return (
    <div
      className={styles.productBackdrop}
      ref={backdropRef}
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles de ${item.name}`}
    >
      <div className={styles.productModal} ref={dialogRef} tabIndex={-1}>
        <button 
          className={styles.productClose} 
          onClick={onClose} 
          aria-label="Cerrar detalle"
        >
          ✕
        </button>

        <div className={styles.productInner}>
          
          {/* --- Galería --- */}
          <div className={styles.productGallery}>
            <div className={styles.productMainImg}>
              {mainImg ? (
                <img src={mainImg} alt={item.name} />
              ) : (
                <div className={styles.productImgPlaceholder} />
              )}
            </div>

            {hasGallery && (
              <div className={styles.productThumbs}>
                {item.img && (
                  <button
                    className={styles.thumb}
                    onClick={() => setMainImg(item.img)}
                    aria-label="Ver imagen principal"
                  >
                    <img src={item.img} alt={item.name} />
                  </button>
                )}

                {item.gallery?.map((imgUrl, i) => (
                  <button
                    key={i}
                    className={styles.thumb}
                    onClick={() => setMainImg(imgUrl)}
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <img src={imgUrl} alt={`${item.name} ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- Detalles --- */}
          <div className={styles.productDetails}>
            
            <div className={styles.productHeader}>
              <h2 className={styles.productTitle}>{item.name}</h2>
              <div className={styles.menuPriceLarge}>${item.price}</div>
            </div>

            {(item.tag || item.badge) && (
              <p className={styles.productTagWrap}>
                {item.tag && <span className={styles.pill}>{item.tag}</span>}
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </p>
            )}

            <p className={styles.productDesc}>{item.longDesc || item.desc}</p>

            {/* Opciones (Solo Tamaño) */}
            {item.sizes && (
              <div className={styles.productOptions}>
                <div>
                  <label className={styles.optLabel}>Tamaño</label>
                  <div className={styles.sizeSelector}>
                    {item.sizes.map((s) => (
                      <button
                        key={s}
                        className={`${styles.sizeBtn} ${size === s ? styles.sizeBtnActive : ''}`}
                        onClick={() => setSize(s)}
                        aria-pressed={size === s}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className={styles.productActions}>
              <button className="btn btnGlass" onClick={toggleFavorite}>
                {isFav ? '★ Favorito' : '☆ Guardar favorito'}
              </button>

              <button className="btn btnOutline" onClick={handleShare}>
                Compartir
              </button>

              <button 
                className="btn btnPrimary" 
                onClick={() => alert('Acción simulada: solicitar info')}
              >
                Solicitar info
              </button>
            </div>

            {/* Ingredientes */}
            {item.ingredients && (
              <div className={styles.productExtras}>
                <h4>Ingredientes</h4>
                <ul>
                  {item.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}