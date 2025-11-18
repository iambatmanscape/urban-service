'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, Calendar, DollarSign, AlertCircle, CheckCircle } from 'lucide-react'

export default function AdminDashboard() {
  const metrics = [
    { label: 'Total Bookings', value: '12,450', icon: Calendar, change: '+12.5%' },
    { label: 'Active Users', value: '8,234', icon: Users, change: '+8.2%' },
    { label: 'Revenue', value: '$98,450', icon: DollarSign, change: '+15.3%' },
    { label: 'Providers', value: '1,542', icon: TrendingUp, change: '+5.1%' },
  ]

  const chartData = [
    { date: 'Jan 1', bookings: 400, revenue: 2400 },
    { date: 'Jan 8', bookings: 520, revenue: 2810 },
    { date: 'Jan 15', bookings: 680, revenue: 3300 },
    { date: 'Jan 22', bookings: 750, revenue: 3800 },
    { date: 'Jan 29', bookings: 920, revenue: 4200 },
  ]

  const recentBookings = [
    { id: 1, customer: 'John Doe', service: 'Plumbing', provider: 'Mike Chen', status: 'completed', amount: '$150' },
    { id: 2, customer: 'Jane Smith', service: 'Cleaning', provider: 'Sarah Johnson', status: 'in-progress', amount: '$120' },
    { id: 3, customer: 'Bob Johnson', service: 'Electrical', provider: 'James Wilson', status: 'pending', amount: '$200' },
  ]

  const disputes = [
    { id: 1, booking: '#12345', issue: 'Quality issue', status: 'open', customer: 'Alice Brown' },
    { id: 2, booking: '#12344', issue: 'No-show', status: 'resolved', customer: 'Charlie Davis' },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-foreground/60">Manage platform metrics and user activities</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.label} className="p-6 border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <span className="text-xs font-medium text-green-600">{metric.change}</span>
                </div>
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <div className="text-sm text-foreground/60">{metric.label}</div>
              </Card>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Bookings Chart */}
          <Card className="p-6 border border-border">
            <h3 className="font-bold text-lg mb-4">Bookings Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="date" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="bookings" stroke="var(--accent)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Revenue Chart */}
          <Card className="p-6 border border-border">
            <h3 className="font-bold text-lg mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="date" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="revenue" fill="var(--accent)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card className="p-6 border border-border">
            <h3 className="font-bold text-lg mb-4">Recent Bookings</h3>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{booking.customer}</p>
                    <p className="text-xs text-foreground/60">{booking.service} • {booking.provider}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{booking.amount}</p>
                    <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                      booking.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : booking.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Disputes */}
          <Card className="p-6 border border-border">
            <h3 className="font-bold text-lg mb-4">Active Disputes</h3>
            <div className="space-y-3">
              {disputes.map((dispute) => (
                <div key={dispute.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{dispute.booking}</p>
                    <p className="text-xs text-foreground/60">{dispute.issue} • {dispute.customer}</p>
                  </div>
                  <div>
                    <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                      dispute.status === 'open'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {dispute.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
