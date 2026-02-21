// src/features/cafe/components/CatalogModal.jsx
import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/cafe.module.css'
import MENU from '../data/menu'
import Card from '@shared/components/Card'
import ProductDetailModal from './ProductDetailModal' // asegúrate de que exista

export default function CatalogModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState(MENU)
  const [detail, setDetail] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites') || '[]') } catch { return [] }
  })

  const backdropRef = useRef(null)
  const modalRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (open) { setItems(MENU); setQuery('') }
  }, [open])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    setItems(q ? MENU.filter(i => `${i.name} ${i.desc} ${i.tag}`.toLowerCase().includes(q)) : MENU)
  }, [query])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        if (detail) setDetail(null)
        else onClose()
      }
    }
    if (open) {
      previouslyFocused.current = document.activeElement
      document.addEventListener('keydown', onKey)
      setTimeout(() => modalRef.current?.focus(), 50)
    }
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, detail])

  function onBackdropClick(e) {
    if (e.target === backdropRef.current) {
      if (detail) setDetail(null)
      else onClose()
    }
  }

  function toggleFavorite(id) {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      try { localStorage.setItem('favorites', JSON.stringify(updated)) } catch {}
      return updated
    })
  }

  if (!open) return null

  return (
    <>
      <div
        className={styles.catalogBackdrop}
        ref={backdropRef}
        onMouseDown={onBackdropClick}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.catalogCard} ref={modalRef} tabIndex={-1}>
          <header className={styles.catalogHeader}>
            <div>
              <h3>Catálogo completo</h3>
              <p className={styles.muted}>Busca, filtra y explora nuestros productos.</p>
            </div>

            <div className={styles.catalogControls}>
              <input
                className={styles.searchInput}
                placeholder="Buscar café, descripción o etiqueta..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar en catálogo"
              />
              <button className="btn btnOutline" onClick={onClose}>Cerrar</button>
            </div>
          </header>

          <div className={styles.catalogGrid}>
            {items.length === 0 ? (
              <div className={styles.emptyState}>No se encontraron resultados.</div>
            ) : items.map(it => (
              <Card key={it.id} className={styles.catalogItem}>
                {/* para permitir el botón flotante, el card debe ser position:relative */}
                <div className={styles.catalogThumb}>
                  {it.img && <img src={it.img} alt={it.name} />}
                </div>

                {/* corazón favorito flotante */}
                <button
                  type="button"
                  className={styles.favoriteFloat}
                  onClick={() => toggleFavorite(it.id)}
                  aria-pressed={favorites.includes(it.id)}
                >
                  {favorites.includes(it.id) ? '❤️' : '🤍'}
                </button>

                <div className={styles.catalogContent}>
                  <div className={styles.catalogBodyHeader}>
                    <strong>{it.name}</strong>
                    <div className={styles.menuPrice}>${it.price}</div>
                  </div>

                  <p className={styles.muted}>{it.desc}</p>
                </div>

                <div className={styles.catalogActions}>
                  <button className="btn btnGlass" onClick={() => setDetail(it)}>Ver</button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {detail && <ProductDetailModal item={detail} onClose={() => setDetail(null)} />}
    </>
  )
}