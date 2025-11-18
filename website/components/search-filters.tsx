'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FilterState {
  category: string
  priceRange: [number, number]
  rating: number
  distance: number
  availability: string
}

interface SearchFiltersProps {
  filters: FilterState
  setFilters: (filters: FilterState) => void
}

export function SearchFilters({ filters, setFilters }: SearchFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    rating: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const categories = ['All', 'Plumbing', 'Cleaning', 'Tutoring', 'Electrical', 'Hair & Beauty']
  const ratings = [5, 4, 3, 2, 1]

  return (
    <div className="space-y-4">
      <Card className="p-4 border border-border">
        <h3 className="font-semibold mb-4 flex items-center justify-between cursor-pointer" onClick={() => toggleSection('category')}>
          Category
          <ChevronDown size={16} className={`transition-transform ${expandedSections.category ? 'rotate-180' : ''}`} />
        </h3>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat.toLowerCase()}
                  checked={filters.category === cat.toLowerCase()}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="rounded"
                />
                <span className="text-sm">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-4 border border-border">
        <h3 className="font-semibold mb-4 flex items-center justify-between cursor-pointer" onClick={() => toggleSection('price')}>
          Price Range
          <ChevronDown size={16} className={`transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
        </h3>
        {expandedSections.price && (
          <div>
            <Slider
              defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
              min={0}
              max={200}
              step={10}
              onValueChange={(value) => setFilters({ ...filters, priceRange: [value[0], value[1]] })}
              className="mb-4"
            />
            <div className="flex justify-between text-sm">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-4 border border-border">
        <h3 className="font-semibold mb-4 flex items-center justify-between cursor-pointer" onClick={() => toggleSection('rating')}>
          Rating
          <ChevronDown size={16} className={`transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} />
        </h3>
        {expandedSections.rating && (
          <div className="space-y-2">
            {ratings.map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
                  className="rounded"
                />
                <span className="text-sm">{rating}★ & up</span>
              </label>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-4 border border-border">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium block mb-2">Distance: {filters.distance} km</label>
            <Slider
              defaultValue={[filters.distance]}
              min={1}
              max={50}
              step={1}
              onValueChange={(value) => setFilters({ ...filters, distance: value[0] })}
            />
          </div>
        </div>
      </Card>

      <Button className="w-full" variant="outline">
        Clear Filters
      </Button>
    </div>
  )
}
