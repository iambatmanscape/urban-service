'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Shield, Ban, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', bookings: 12, status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', bookings: 8, status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', bookings: 3, status: 'inactive' },
  ]

  const providers = [
    {
      id: 1,
      name: 'Mike Chen',
      service: 'Electrical Work',
      email: 'mike@example.com',
      jobs: 156,
      rating: 4.9,
      status: 'verified',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      service: 'Home Cleaning',
      email: 'sarah@example.com',
      jobs: 312,
      rating: 4.8,
      status: 'verified',
    },
    {
      id: 3,
      name: 'James Wilson',
      service: 'Plumbing',
      email: 'james@example.com',
      jobs: 45,
      rating: 4.6,
      status: 'pending',
    },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-foreground/60">Manage customers and service providers</p>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 text-foreground/40" size={20} />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="customers" className="data-[state=active]:bg-background">
              Customers ({customers.length})
            </TabsTrigger>
            <TabsTrigger value="providers" className="data-[state=active]:bg-background">
              Providers ({providers.length})
            </TabsTrigger>
          </TabsList>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card className="border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Bookings</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                        <td className="px-6 py-4 font-medium">{customer.name}</td>
                        <td className="px-6 py-4 text-foreground/60">{customer.email}</td>
                        <td className="px-6 py-4">{customer.bookings}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            customer.status === 'active'
                              ? 'bg-green-100/20 text-green-700'
                              : 'bg-gray-100/20 text-gray-700'
                          }`}>
                            {customer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Providers Tab */}
          <TabsContent value="providers">
            <Card className="border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Service</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Jobs</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers.map((provider) => (
                      <tr key={provider.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                        <td className="px-6 py-4 font-medium">{provider.name}</td>
                        <td className="px-6 py-4 text-foreground/60">{provider.service}</td>
                        <td className="px-6 py-4">{provider.jobs}</td>
                        <td className="px-6 py-4">{provider.rating}★</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            provider.status === 'verified'
                              ? 'bg-green-100/20 text-green-700'
                              : 'bg-yellow-100/20 text-yellow-700'
                          }`}>
                            {provider.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <Button size="sm" variant="outline" className="gap-2">
                            <CheckCircle size={14} />
                            Verify
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2 text-red-600">
                            <Ban size={14} />
                            Ban
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
