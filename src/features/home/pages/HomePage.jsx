import React, { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import MenuPreview from '../../cafe/components/MenuPreview'
import ReservationSection from '../components/ReservationSection'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import CatalogModal from '../../cafe/components/CatalogModal'
import ProductDetailModal from '../../cafe/components/ProductDetailModal'

export default function HomePage(){
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [detailItem, setDetailItem] = useState(null)
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuPreview onViewDetail={item => setDetailItem(item)} previewCount={6} onOpenCatalog={() => setCatalogOpen(true)} />
        {detailItem && <ProductDetailModal item={detailItem} onClose={() => setDetailItem(null)} />}
        <ReservationSection />
        <Contact />
      </main>
      <Footer />
      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />
         {detailItem && (
        <ProductDetailModal item={detailItem} onClose={() => setDetailItem(null)} />
      )}
    </>
  )
}
