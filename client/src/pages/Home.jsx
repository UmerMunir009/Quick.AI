import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ToolsSection from '../components/ToolsSection'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import MarqueeCards from '../components/MarqueeCards'
import Plan from '../components/Plan'

const Home = () => {
  return (
    < >
      <Navbar/>
      <Hero/>
      <MarqueeCards/>
      <ToolsSection/>
      <Testimonials/>
      <Plan/>
      <Footer/>
    </>
  )
}

export default Home
