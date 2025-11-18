'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SearchFilters } from '@/components/search-filters'
import { ProviderCard } from '@/components/provider-card'
import { MapView } from '@/components/map-view'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Map, List } from 'lucide-react'

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 200],
    rating: 0,
    distance: 10,
    availability: 'all',
  })

  // Mock provider data
  const providers = [
    {
      id: 1,
      name: 'John Smith',
      service: 'Plumbing',
      rating: 4.9,
      reviews: 287,
      distance: 0.8,
      price: 45,
      badge: 'Verified',
      availability: 'Available today',
      image: '/male-plumber-professional.png',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      service: 'Home Cleaning',
      rating: 4.8,
      reviews: 312,
      distance: 1.2,
      price: 35,
      badge: 'Top Rated',
      availability: 'Available tomorrow',
      image: '/female-cleaning-professional.jpg',
    },
    {
      id: 3,
      name: 'Mike Chen',
      service: 'Electrical Work',
      rating: 5.0,
      reviews: 156,
      distance: 2.1,
      price: 50,
      badge: 'Certified',
      availability: 'Available in 2 hours',
      image: '/male-electrician-professional.jpg',
    },
    {
      id: 4,
      name: 'Emily Davis',
      service: 'Tutoring',
      rating: 4.9,
      reviews: 198,
      distance: 1.5,
      price: 30,
      badge: 'Verified',
      availability: 'Available now',
      image: '/female-tutor-professional.jpg',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Search Results</h1>
          <p className="text-foreground/60">Found {providers.length} providers matching your criteria</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* View Toggle */}
            <div className="flex gap-2 mb-6 md:hidden">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex-1 gap-2"
              >
                <List size={16} /> List
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="flex-1 gap-2"
              >
                <Map size={16} /> Map
              </Button>
            </div>

            {/* Content based on view mode */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {providers.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            )}

            {viewMode === 'map' && (
              <MapView providers={providers} />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
