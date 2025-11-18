'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Clock, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'

interface Provider {
  id: number
  name: string
  service: string
  rating: number
  reviews: number
  distance: number
  price: number
  badge: string
  availability: string
  image: string
}

interface ProviderCardProps {
  provider: Provider
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Card className="p-4 border border-border hover:border-accent/40 hover:shadow-lg transition-smooth">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Provider Image */}
        <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
          <img
            src={provider.image || "/placeholder.svg"}
            alt={provider.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Provider Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{provider.name}</h3>
                <span className="inline-block bg-accent/10 text-accent text-xs px-2 py-1 rounded">
                  {provider.badge}
                </span>
              </div>
              <p className="text-sm text-foreground/60">{provider.service}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">${provider.price}</div>
              <p className="text-xs text-foreground/60">/hour</p>
            </div>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-4 mb-3 text-sm">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-foreground text-foreground" />
              <span className="font-semibold">{provider.rating}</span>
              <span className="text-foreground/60">({provider.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-foreground/60">
              <MapPin size={16} />
              {provider.distance} km away
            </div>
            <div className="flex items-center gap-1 text-foreground/60">
              <Clock size={16} />
              {provider.availability}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" asChild>
              <Link href={`/provider/${provider.id}`}>View Profile</Link>
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <MessageCircle size={16} />
              Message
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Phone size={16} />
              Call
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
