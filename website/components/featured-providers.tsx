import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MapPin } from 'lucide-react'

const providers = [
  {
    id: 1,
    name: 'John Smith',
    service: 'Plumbing',
    rating: 4.9,
    reviews: 287,
    distance: '0.8 km away',
    price: '$45/hour',
    badge: 'Verified',
    image: '/male-plumber-professional.png',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    service: 'Home Cleaning',
    rating: 4.8,
    reviews: 312,
    distance: '1.2 km away',
    price: '$35/hour',
    badge: 'Top Rated',
    image: '/female-cleaning-professional.jpg',
  },
  {
    id: 3,
    name: 'Mike Chen',
    service: 'Electrical Work',
    rating: 5.0,
    reviews: 156,
    distance: '2.1 km away',
    price: '$50/hour',
    badge: 'Certified',
    image: '/male-electrician-professional.jpg',
  },
  {
    id: 4,
    name: 'Emily Davis',
    service: 'Tutoring',
    rating: 4.9,
    reviews: 198,
    distance: '1.5 km away',
    price: '$30/hour',
    badge: 'Verified',
    image: '/female-tutor-professional.jpg',
  },
]

export function FeaturedProviders() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured providers near you</h2>
          <p className="text-foreground/60 text-lg">
            Highly rated and verified professionals ready to help
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {providers.map((provider) => (
            <Card
              key={provider.id}
              className="overflow-hidden hover:shadow-lg transition-smooth border border-border"
            >
              <div className="aspect-square bg-muted relative">
                <img
                  src={provider.image || "/placeholder.svg"}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
                  {provider.badge}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{provider.name}</h3>
                <p className="text-sm text-foreground/60 mb-3">{provider.service}</p>

                <div className="flex items-center gap-1 mb-3">
                  <Star size={16} className="fill-foreground text-foreground" />
                  <span className="font-semibold">{provider.rating}</span>
                  <span className="text-sm text-foreground/60">({provider.reviews})</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-foreground/60 mb-4">
                  <MapPin size={16} />
                  {provider.distance}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">{provider.price}</span>
                </div>

                <Button className="w-full" asChild>
                  <a href={`/provider/${provider.id}`}>View profile</a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
