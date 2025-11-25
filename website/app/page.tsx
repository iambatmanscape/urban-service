import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { CategoryGrid } from '@/components/category-grid'
import { HowItWorks } from '@/components/how-it-works'
// import { FeaturedProviders } from '@/components/featured-providers'
import { TrustSection } from '@/components/trust-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryGrid />
      <HowItWorks />
      {/* <FeaturedProviders /> */}
      <TrustSection />
      <Footer />
    </div>
  )
}
