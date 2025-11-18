'use client'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Star, AlertCircle } from 'lucide-react'

interface BookingSummaryProps {
  providerId: string
  bookingData: any
}

export function BookingSummary({ providerId, bookingData }: BookingSummaryProps) {
  // Mock provider info
  const provider = {
    name: 'John Smith',
    rating: 4.9,
    reviews: 287,
    image: '/male-plumber-professional.png',
  }

  const servicePrice = bookingData.service === 'Emergency Repair' ? 150 : bookingData.service === 'Regular Maintenance' ? 85 : 120
  const platformFee = Math.round(servicePrice * 0.1)
  const total = servicePrice + platformFee

  return (
    <Card className="p-6 border border-border sticky top-20">
      <h3 className="text-lg font-bold mb-4">Booking Summary</h3>

      {/* Provider Card */}
      <div className="flex gap-3 mb-6 pb-6 border-b border-border">
        <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
          <img
            src={provider.image || "/placeholder.svg"}
            alt={provider.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{provider.name}</h4>
          <div className="flex items-center gap-1 text-sm">
            <Star size={14} className="fill-foreground text-foreground" />
            <span>{provider.rating}</span>
            <span className="text-foreground/60">({provider.reviews})</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        {bookingData.service && (
          <div className="flex justify-between text-sm">
            <span className="text-foreground/70">Service</span>
            <span className="font-medium">{bookingData.service}</span>
          </div>
        )}
        {bookingData.date && (
          <div className="flex justify-between text-sm">
            <span className="text-foreground/70">Date</span>
            <span className="font-medium">
              {new Date(bookingData.date + 'T00:00:00').toLocaleDateString()}
            </span>
          </div>
        )}
        {bookingData.time && (
          <div className="flex justify-between text-sm">
            <span className="text-foreground/70">Time</span>
            <span className="font-medium">{bookingData.time}</span>
          </div>
        )}
      </div>

      {/* Pricing */}
      {bookingData.service && (
        <>
          <div className="space-y-3 mb-6 pb-6 border-b border-border">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/70">Service</span>
              <span className="font-medium">${servicePrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/70">Platform fee</span>
              <span className="font-medium">${platformFee}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-bold text-accent">${total}</span>
          </div>

          <Card className="p-3 border border-border bg-muted/30 flex gap-3">
            <AlertCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/70">
              You can pay after the service is completed. No payment needed now.
            </p>
          </Card>
        </>
      )}
    </Card>
  )
}
