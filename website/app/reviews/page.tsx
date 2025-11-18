'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ThumbsUp, Flag } from 'lucide-react'
import { useState } from 'react'

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      author: 'Michael R.',
      rating: 5,
      date: '2025-01-10',
      text: 'Excellent service! John arrived on time and completed the work professionally. Highly recommended!',
      helpful: 24,
      provider: 'John Smith',
      service: 'Plumbing Repair',
      image: '/male-plumber-professional.png',
    },
    {
      id: 2,
      author: 'Sarah L.',
      rating: 5,
      date: '2025-01-08',
      text: 'Great experience from start to finish. Very professional and took the time to explain everything.',
      helpful: 18,
      provider: 'John Smith',
      service: 'Plumbing Repair',
      image: '/male-plumber-professional.png',
    },
    {
      id: 3,
      author: 'James K.',
      rating: 4,
      date: '2025-01-05',
      text: 'Good work, but took a bit longer than expected. Still very satisfied with the results.',
      helpful: 12,
      provider: 'John Smith',
      service: 'Plumbing Repair',
      image: '/male-plumber-professional.png',
    },
  ]

  const [helpfulCount, setHelpfulCount] = useState<Record<number, boolean>>({})

  const handleHelpful = (reviewId: number) => {
    setHelpfulCount(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Customer Reviews</h1>
        <p className="text-foreground/60 mb-8">Real feedback from ServiceHub customers</p>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6 border border-border">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                  <img
                    src={review.image || "/placeholder.svg"}
                    alt={review.provider}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{review.author}</h3>
                    <span className="text-xs text-foreground/60">{review.date}</span>
                  </div>
                  <p className="text-sm text-foreground/60 mb-2">
                    {review.service} • {review.provider}
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-foreground text-foreground" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-foreground/70 mb-4">{review.text}</p>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-smooth"
                >
                  <ThumbsUp
                    size={16}
                    className={helpfulCount[review.id] ? 'fill-accent text-accent' : ''}
                  />
                  <span>Helpful ({review.helpful + (helpfulCount[review.id] ? 1 : 0)})</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-red-600 transition-smooth">
                  <Flag size={16} />
                  Report
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline">1</Button>
          <Button>2</Button>
          <Button variant="outline">3</Button>
          <Button>Next</Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
