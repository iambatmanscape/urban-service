'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, Calendar, DollarSign, Users, Clock, CheckCircle, AlertCircle, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'

export default function ProviderDashboard() {
  const provider = {
    name: 'John Smith',
    service: 'Plumbing Services',
    rating: 4.9,
    earnings: 12450,
    jobsCompleted: 287,
    bookings: 5,
  }

  const stats = [
    { label: 'Earnings (This Month)', value: '$3,240', icon: TrendingUp },
    { label: 'Jobs Completed', value: '287', icon: CheckCircle },
    { label: 'Rating', value: '4.9★', icon: Users },
    { label: 'Response Time', value: '< 1 hour', icon: Clock },
  ]

  const pendingJobs = [
    {
      id: 1,
      customer: 'Michael R.',
      service: 'Leak Repair',
      date: '2025-01-15',
      time: '14:00',
      location: '123 Main St',
      status: 'pending',
      price: 150,
    },
    {
      id: 2,
      customer: 'Sarah L.',
      service: 'Pipe Installation',
      date: '2025-01-16',
      time: '10:00',
      location: '456 Oak Ave',
      status: 'pending',
      price: 200,
    },
  ]

  const acceptedJobs = [
    {
      id: 3,
      customer: 'James K.',
      service: 'Water Heater Replacement',
      date: '2025-01-14',
      time: '15:00',
      location: '789 Elm Rd',
      status: 'accepted',
      price: 180,
    },
  ]

  const completedJobs = [
    {
      id: 4,
      customer: 'Emily D.',
      service: 'Drain Cleaning',
      date: '2025-01-10',
      time: '11:00',
      status: 'completed',
      price: 95,
      rating: 5,
    },
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
                <h3 className="font-bold text-center text-lg">{provider.name}</h3>
                <p className="text-sm text-foreground/60 text-center">{provider.service}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-border">
                <div className="text-center mb-3">
                  <div className="text-xl font-bold text-accent">{provider.rating}★</div>
                  <div className="text-xs text-foreground/60">Rating</div>
                </div>
              </div>

              <nav className="space-y-2">
                <Link href="/provider/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-accent/10 text-accent font-medium">
                  <TrendingUp size={18} />
                  Dashboard
                </Link>
                <Link href="/provider/jobs" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground/70 transition-smooth">
                  <Calendar size={18} />
                  Jobs
                </Link>
                <Link href="/provider/earnings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground/70 transition-smooth">
                  <DollarSign size={18} />
                  Earnings
                </Link>
                <Link href="/provider/reviews" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground/70 transition-smooth">
                  <Users size={18} />
                  Reviews
                </Link>
                <Link href="/provider/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground/70 transition-smooth">
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
              <h1 className="text-3xl font-bold mb-2">Welcome back, {provider.name}</h1>
              <p className="text-foreground/60">Manage your jobs and earnings</p>
            </Card>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className="p-6 border border-border">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon size={20} className="text-accent" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-foreground/60">{stat.label}</div>
                  </Card>
                )
              })}
            </div>

            {/* Jobs Tabs */}
            <Tabs defaultValue="pending" className="space-y-6">
              <TabsList className="bg-muted grid grid-cols-3 w-full">
                <TabsTrigger value="pending" className="data-[state=active]:bg-background">
                  Pending ({pendingJobs.length})
                </TabsTrigger>
                <TabsTrigger value="accepted" className="data-[state=active]:bg-background">
                  Accepted ({acceptedJobs.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-background">
                  Completed ({completedJobs.length})
                </TabsTrigger>
              </TabsList>

              {/* Pending Jobs */}
              <TabsContent value="pending" className="space-y-4">
                {pendingJobs.map((job) => (
                  <Card key={job.id} className="p-6 border border-border hover:border-accent/40 transition-smooth">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{job.service}</h3>
                        <p className="text-sm text-foreground/60 mb-3">Customer: {job.customer}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                          <span>{new Date(job.date).toLocaleDateString()} at {job.time}</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="text-2xl font-bold">${job.price}</div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-accent hover:bg-accent/90">
                            Accept
                          </Button>
                          <Button size="sm" variant="outline">
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Accepted Jobs */}
              <TabsContent value="accepted" className="space-y-4">
                {acceptedJobs.map((job) => (
                  <Card key={job.id} className="p-6 border border-border hover:border-accent/40 transition-smooth">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{job.service}</h3>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                            {job.status}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/60 mb-3">Customer: {job.customer}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                          <span>{new Date(job.date).toLocaleDateString()} at {job.time}</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="text-2xl font-bold">${job.price}</div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Completed Jobs */}
              <TabsContent value="completed" className="space-y-4">
                {completedJobs.map((job) => (
                  <Card key={job.id} className="p-6 border border-border">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{job.service}</h3>
                        <p className="text-sm text-foreground/60 mb-3">Customer: {job.customer}</p>
                        <div className="flex items-center gap-2">
                          {[...Array(job.rating)].map((_, i) => (
                            <span key={i} className="text-accent">★</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="text-2xl font-bold">${job.price}</div>
                        <span className="text-sm text-foreground/60">{new Date(job.date).toLocaleDateString()}</span>
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
