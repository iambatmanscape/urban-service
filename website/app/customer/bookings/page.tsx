'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, MapPin, Calendar, DollarSign } from 'lucide-react'

export default function BookingsPage() {
  const bookings = [
    {
      id: 1,
      service: 'Plumbing Repair',
      provider: 'John Smith',
      date: '2025-01-15',
      time: '14:00',
      location: '123 Main St',
      status: 'confirmed',
      price: 150,
    },
    {
      id: 2,
      service: 'Home Cleaning',
      provider: 'Sarah Johnson',
      date: '2025-01-18',
      time: '10:00',
      location: '456 Business Ave',
      status: 'pending',
      price: 120,
    },
    {
      id: 3,
      service: 'Electrical Work',
      provider: 'Mike Chen',
      date: '2025-01-10',
      time: '15:00',
      location: '789 Oak Rd',
      status: 'completed',
      price: 200,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-foreground/60 mb-8">Manage and track all your service bookings</p>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="all" className="data-[state=active]:bg-background">
              All
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-background">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-background">
              Completed
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="data-[state=active]:bg-background">
              Cancelled
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-6 border border-border hover:border-accent/40 transition-smooth">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{booking.service}</h3>
                    <p className="text-sm text-foreground/60">with {booking.provider}</p>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent capitalize">
                    {booking.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-4 gap-4 mb-4 text-sm text-foreground/60">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(booking.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {booking.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {booking.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} />
                    ${booking.price}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <a href={`/booking/${booking.id}`}>View Details</a>
                  </Button>
                  {booking.status === 'upcoming' && (
                    <>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline">
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="upcoming">
            {bookings
              .filter((b) => b.status === 'confirmed' || b.status === 'pending')
              .map((booking) => (
                <Card key={booking.id} className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-2">{booking.service}</h3>
                  <p className="text-sm text-foreground/60">{booking.date} at {booking.time}</p>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="completed">
            {bookings
              .filter((b) => b.status === 'completed')
              .map((booking) => (
                <Card key={booking.id} className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-2">{booking.service}</h3>
                  <p className="text-sm text-foreground/60">{booking.date}</p>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
