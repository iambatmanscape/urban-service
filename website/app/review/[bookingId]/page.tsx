'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Star } from 'lucide-react'

interface ReviewPageProps {
  params: {
    bookingId: string
  }
}

export default function ReviewPage({ params }: ReviewPageProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Review submitted:', { rating, reviewText, bookingId: params.bookingId })
  }

  const provider = {
    name: 'John Smith',
    service: 'Plumbing Repair',
    image: '/male-plumber-professional.png',
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-8 border border-border">
          <h1 className="text-3xl font-bold mb-2">Rate your experience</h1>
          <p className="text-foreground/60 mb-8">Help others find quality service providers</p>

          {/* Provider Info */}
          <div className="mb-8 pb-8 border-b border-border flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden">
              <img
                src={provider.image || "/placeholder.svg"}
                alt={provider.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{provider.name}</h2>
              <p className="text-foreground/60">{provider.service}</p>
            </div>
          </div>

          {/* Rating */}
          <form onSubmit={handleSubmitReview} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-4">How was your experience?</label>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={40}
                      className={`${
                        (hoverRating || rating) >= star
                          ? 'fill-accent text-accent'
                          : 'text-border'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-foreground/60">
                {rating === 0 ? 'Select a rating' : ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating - 1]}
              </p>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-lg font-semibold mb-4">Share your feedback</label>
              <textarea
                placeholder="Tell us about your experience with this service provider..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent h-32 resize-none"
              />
              <p className="text-xs text-foreground/60 mt-2">{reviewText.length}/500 characters</p>
            </div>

            {/* Anonymous Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Post as anonymous</span>
            </label>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button variant="outline" type="button" className="flex-1">
                Skip
              </Button>
              <Button type="submit" disabled={rating === 0} className="flex-1">
                Submit Review
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
