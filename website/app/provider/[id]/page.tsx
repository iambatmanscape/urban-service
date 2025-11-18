'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star, MapPin, Phone, MessageCircle, Briefcase, Award, Shield } from 'lucide-react'
import Link from 'next/link'

interface ProviderPageProps {
  params: {
    id: string
  }
}

export default function ProviderPage({ params }: ProviderPageProps) {
  // Mock provider data
  const provider = {
    id: params.id,
    name: 'John Smith',
    service: 'Professional Plumbing Services',
    rating: 4.9,
    reviews: 287,
    distance: 0.8,
    price: 45,
    phone: '+1 (555) 123-4567',
    responseTime: '< 1 hour',
    jobs: 1200,
    image: '/male-plumber-professional.png',
    bio: 'Experienced plumber with over 15 years of expertise in residential and commercial plumbing. Licensed and insured. Available for emergency calls 24/7.',
    verified: true,
    insurance: true,
    certifications: ['Master Plumber License', 'Water System Certification'],
    services: ['Leak Repairs', 'Pipe Installation', 'Drain Cleaning', 'Water Heater Replacement'],
    availability: 'Available today at 2:00 PM',
    reviews_list: [
      { author: 'Michael R.', rating: 5, text: 'Professional and quick. Fixed the issue in under an hour!' },
      { author: 'Sarah L.', rating: 5, text: 'Great service, reasonable prices. Would definitely hire again.' },
      { author: 'James K.', rating: 4, text: 'Good work but took longer than expected.' },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Profile Image and Quick Actions */}
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden bg-muted mb-4 h-48">
              <img
                src={provider.image || "/placeholder.svg"}
                alt={provider.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <Button className="w-full" asChild>
                <Link href={`/booking/${provider.id}`}>Book now</Link>
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <MessageCircle size={16} />
                Message
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Phone size={16} />
                Call
              </Button>
            </div>
          </div>

          {/* Provider Details */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{provider.name}</h1>
              <p className="text-lg text-foreground/70 mb-4">{provider.service}</p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-foreground text-foreground" />
                  <span className="text-2xl font-bold">{provider.rating}</span>
                  <span className="text-foreground/60">({provider.reviews} reviews)</span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="p-4 border border-border">
                  <div className="text-3xl font-bold mb-1">{provider.jobs}</div>
                  <div className="text-sm text-foreground/60">Jobs completed</div>
                </Card>
                <Card className="p-4 border border-border">
                  <div className="text-lg font-semibold mb-1">{provider.responseTime}</div>
                  <div className="text-sm text-foreground/60">Response time</div>
                </Card>
                <Card className="p-4 border border-border">
                  <div className="text-lg font-semibold mb-1">${provider.price}</div>
                  <div className="text-sm text-foreground/60">Per hour</div>
                </Card>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {provider.verified && (
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    <Shield size={16} />
                    Verified
                  </div>
                )}
                {provider.insurance && (
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    <Award size={16} />
                    Insured
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bio and Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 border border-border">
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-foreground/70 mb-6">{provider.bio}</p>

            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2">
              {provider.services.map((service) => (
                <li key={service} className="flex items-center gap-2 text-foreground/70">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  {service}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 border border-border">
            <h3 className="text-xl font-semibold mb-4">Credentials</h3>

            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-sm">Certifications</h4>
              <ul className="space-y-2">
                {provider.certifications.map((cert) => (
                  <li key={cert} className="flex items-center gap-2 text-foreground/70">
                    <Award size={16} className="text-accent" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Location</h4>
              <div className="flex items-center gap-2 text-foreground/70">
                <MapPin size={16} className="text-accent" />
                {provider.distance} km away
              </div>
            </div>
          </Card>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
          <div className="space-y-4">
            {provider.reviews_list.map((review, index) => (
              <Card key={index} className="p-6 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold">{review.author}</div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-foreground text-foreground" />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/70">{review.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
