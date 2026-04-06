import { content } from '../data/content'
import SEO from '../components/SEO'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
// ... rest of imports
import ProblemSolution from '../sections/ProblemSolution'
import NeelWoodAdvantage from '../sections/NeelWoodAdvantage'
import Services from '../sections/Services'
import Products from '../sections/Products'
import WhyChooseUs from '../sections/WhyChooseUs'
import Contact from '../sections/Contact'
import FinalCTA from '../sections/FinalCTA'
import Footer from '../sections/Footer'

export default function HomePage() {
  return (
    <>
      <SEO {...content.seo.home} />
      <Header />
      <Hero />
      <ProblemSolution />
      <NeelWoodAdvantage />
      <Services />
      <Products />
      <WhyChooseUs />
      <Contact />
      <FinalCTA />
      <Footer />
    </>
  )
}
