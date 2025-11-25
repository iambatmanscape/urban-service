'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Sparkles } from 'lucide-react'
import { useState } from 'react'

export function HeroSection() {
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 gradient-primary opacity-10 blur-3xl" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">ServiceHub</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance text-gradient">
          Find trusted local services instantly
        </h1>
        <p className="text-lg md:text-xl mb-12 text-foreground/70 max-w-2xl">
          Connect with verified service providers. Book now, pay securely, and get the job done.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 bg-white dark:bg-slate-950 rounded-2xl p-3 shadow-xl border border-border backdrop-blur-sm">
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Search size={20} className="text-accent flex-shrink-0" />
            <input
              type="text"
              placeholder="What service do you need?"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full outline-none bg-transparent text-foreground placeholder:text-foreground/40 text-base"
            />
          </div>
          <div className="flex-1 flex items-center gap-3 px-4 py-3 border-l border-border">
            <MapPin size={20} className="text-primary flex-shrink-0" />
            <input
              type="text"
              placeholder="Where?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full outline-none bg-transparent text-foreground placeholder:text-foreground/40 text-base"
            />
          </div>
          <Button
            className="md:w-auto px-8 bg-gradient-to-r from-accent to-orange-500 hover:shadow-lg text-white font-semibold rounded-xl transition-smooth"
            onClick={() => console.log('Search:', service, location)}
          >
            Search
          </Button>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <Button
            className="gradient-accent hover:shadow-xl text-white px-8 py-6 text-lg font-semibold rounded-xl transition-smooth"
            asChild
          >
            <a href="/search">Book a service</a>
          </Button>
          <Button
            className="px-8 py-6 text-lg font-semibold rounded-xl border-2 border-primary text-white hover:bg-primary/5 hover:text-primary transition-smooth"
            asChild
          >
            <a href="/become-provider">Become a provider</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
