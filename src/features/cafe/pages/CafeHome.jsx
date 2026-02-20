import React, { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import MenuPreview from '../components/MenuPreview'
import ReservationSection from '../components/ReservationSection'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import CatalogModal from '../components/CatalogModal'

export default function CafeHome() {
  const [catalogOpen, setCatalogOpen] = useState(false)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuPreview previewCount={6} onOpenCatalog={() => setCatalogOpen(true)} />
        <ReservationSection />
        <Contact />
      </main>

      <Footer />

      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </>
  )
}
