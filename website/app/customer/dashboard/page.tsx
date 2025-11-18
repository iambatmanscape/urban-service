'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, MapPin, Star, Wallet, Home, Settings, LogOut, Bell } from 'lucide-react'
import Link from 'next/link'

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Mock customer data
  const customer = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    bookings: 24,
    avatar: '/placeholder.svg?key=cusx1',
  }

  const upcomingBookings = [
    {
      id: 1,
      service: 'Plumbing Repair',
      provider: 'John Smith',
      date: '2025-01-15',
      time: '14:00',
      status: 'confirmed',
      price: 150,
      image: '/male-plumber-professional.png',
    },
    {
      id: 2,
      service: 'Home Cleaning',
      provider: 'Sarah Johnson',
      date: '2025-01-18',
      time: '10:00',
      status: 'pending',
      price: 120,
      image: '/female-cleaning-professional.jpg',
    },
  ]

  const completedBookings = [
    {
      id: 3,
      service: 'Electrical Work',
      provider: 'Mike Chen',
      date: '2025-01-10',
      time: '15:00',
      status: 'completed',
      rating: 5,
      price: 200,
      image: '/male-electrician-professional.jpg',
    },
    {
      id: 4,
      service: 'Tutoring',
      provider: 'Emily Davis',
      date: '2025-01-08',
      time: '18:00',
      status: 'completed',
      rating: 4,
      price: 60,
      image: '/female-tutor-professional.jpg',
    },
  ]

  const savedAddresses = [
    { id: 1, name: 'Home', address: '123 Main St, City, State 12345' },
    { id: 2, name: 'Work', address: '456 Business Ave, City, State 67890' },
  ]

  const paymentMethods = [
    { id: 1, type: 'card', name: 'Visa ending in 4242', default: true },
    { id: 2, type: 'card', name: 'Mastercard ending in 8888', default: false },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 border border-border sticky top-20">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3 mx-auto">
                  <div className="w-10 h-10 rounded bg-accent" />
                </div>
                <h3 className="font-bold text-center text-lg">{customer.name}</h3>
                <p className="text-sm text-foreground/60 text-center">{customer.email}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold">{customer.bookings}</div>
                  <div className="text-xs text-foreground/60">Total bookings</div>
                </div>
              </div>

              <nav className="space-y-2">
                <Link href="/customer/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-accent/10 text-accent font-medium">
                  <Clock size={18} />
                  Dashboard
                </Link>
                <Link href="/customer/bookings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground/70 transition-smooth">
                  <MapPin size={18} />
                  My Bookings
                </Link>
                <Link href="/customer/addresses" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground/70 transition-smooth">
                  <Home size={18} />
                  Addresses
                </Link>
                <Link href="/customer/payments" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground/70 transition-smooth">
                  <Wallet size={18} />
                  Payments
                </Link>
                <Link href="/customer/notifications" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground/70 transition-smooth">
                  <Bell size={18} />
                  Notifications
                </Link>
                <Link href="/customer/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground/70 transition-smooth">
                  <Settings size={18} />
                  Settings
                </Link>

                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground/70 transition-smooth">
                  <LogOut size={18} />
                  Logout
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Section */}
            <Card className="p-8 border border-border mb-8 bg-gradient-to-br from-accent/5 to-background">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {customer.name.split(' ')[0]}</h1>
              <p className="text-foreground/60 mb-6">Manage your bookings and profile all in one place</p>
              <Button asChild>
                <Link href="/search">Book a new service</Link>
              </Button>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:w-auto bg-muted">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-background">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-background">
                  Completed
                </TabsTrigger>
              </TabsList>

              {/* Upcoming Bookings */}
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingBookings.length === 0 ? (
                  <Card className="p-8 text-center border border-border">
                    <p className="text-foreground/60 mb-4">No upcoming bookings</p>
                    <Button asChild>
                      <Link href="/search">Browse services</Link>
                    </Button>
                  </Card>
                ) : (
                  upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="p-6 border border-border hover:border-accent/40 transition-smooth">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                            <img
                              src={booking.image || "/placeholder.svg"}
                              alt={booking.provider}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{booking.service}</h3>
                            <p className="text-sm text-foreground/60 mb-2">Provider: {booking.provider}</p>
                            <div className="flex items-center gap-4 text-sm text-foreground/60">
                              <span className="flex items-center gap-1">
                                <Clock size={16} />
                                {new Date(booking.date).toLocaleDateString()} at {booking.time}
                              </span>
                              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                                {booking.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-2xl font-bold">${booking.price}</div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Details
                            </Button>
                            <Button size="sm">
                              Track
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Completed Bookings */}
              <TabsContent value="completed" className="space-y-4">
                {completedBookings.map((booking) => (
                  <Card key={booking.id} className="p-6 border border-border hover:border-accent/40 transition-smooth">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                          <img
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.provider}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{booking.service}</h3>
                          <p className="text-sm text-foreground/60 mb-2">Provider: {booking.provider}</p>
                          <div className="flex items-center gap-2">
                            {[...Array(booking.rating)].map((_, i) => (
                              <Star key={i} size={16} className="fill-foreground text-foreground" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-2xl font-bold">${booking.price}</div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
