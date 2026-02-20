// src/features/cafe/components/CatalogModal.jsx
import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/cafe.module.css'
import MENU from '../data/menu'
import Card from '@shared/components/Card'

export default function CatalogModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState(MENU)
  const [detail, setDetail] = useState(null)
  const backdropRef = useRef(null)
  const modalRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    setItems(MENU)
    setQuery('')
  }, [open])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) setItems(MENU)
    else setItems(MENU.filter(i => `${i.name} ${i.desc} ${i.tag}`.toLowerCase().includes(q)))
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
    } else {
      document.removeEventListener('keydown', onKey)
      previouslyFocused.current?.focus && previouslyFocused.current.focus()
    }
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, detail])

  if (!open) return null

  function onBackdropClick(e) {
    if (e.target === backdropRef.current) {
      if (detail) setDetail(null)
      else onClose()
    }
  }

  return (
    <>
      <div
        className={styles.catalogBackdrop}
        ref={backdropRef}
        onMouseDown={onBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label="Catálogo completo"
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
              <button className={styles.iconClose} onClick={() => onClose()} aria-label="Cerrar catálogo">✕</button>
            </div>
          </header>

          <div className={styles.catalogGrid}>
            {items.length === 0 ? (
              <div className={styles.emptyState}>No se encontraron resultados.</div>
            ) : items.map(it => (
              <Card key={it.id} className={`${styles.catalogItem} ${styles.glass}`}>
                <div className={styles.catalogThumb}>
                  {it.img ? <img src={it.img} alt={it.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/> : null}
                </div>

                <div className={styles.catalogBody}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <strong>{it.name}</strong>
                    <div className={styles.menuPrice}>${it.price}</div>
                  </div>

                  <div className={styles.muted} style={{marginTop:6}}>{it.desc}</div>

                  <div style={{marginTop:12, display:'flex', gap:8, alignItems:'center'}}>
                    <button className="btn btnGlass" onClick={() => setDetail(it)}>Ver</button>

                    {/* Visual-only: boton de favorito local (opcional) */}
                    <button
                      className="btn btnOutline"
                      onClick={() => {
                        // simple visual feedback: guardar id en localStorage como favorito (opcional)
                        try {
                          const fav = JSON.parse(localStorage.getItem('favorites') || '[]')
                          if (!fav.includes(it.id)) {
                            localStorage.setItem('favorites', JSON.stringify([...fav, it.id]))
                            alert(`${it.name} agregado a favoritos (local)`)
                          } else {
                            alert(`${it.name} ya está en favoritos`)
                          }
                        } catch { /* ignore */ }
                      }}
                    >
                      ♥ Favorito
                    </button>

                    <div className={styles.pill}>{it.tag}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* detalle en modal separado (imagen grande + info) */}
      {detail && <ProductDetailModal item={detail} onClose={() => setDetail(null)} />}
    </>
  )
}
