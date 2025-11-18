'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

interface Provider {
  id: number
  name: string
  distance: number
  rating: number
}

interface MapViewProps {
  providers: Provider[]
}

export function MapView({ providers }: MapViewProps) {
  return (
    <Card className="p-8 border border-border bg-muted/50 min-h-96 flex items-center justify-center flex-col gap-4">
      <AlertCircle size={48} className="text-foreground/40" />
      <div className="text-center">
        <h3 className="font-semibold text-lg mb-2">Map View</h3>
        <p className="text-foreground/60 max-w-md">
          Map integration would be implemented here using a mapping library like Mapbox or Google Maps.
          Currently showing {providers.length} providers at their estimated locations.
        </p>
      </div>
    </Card>
  )
}
