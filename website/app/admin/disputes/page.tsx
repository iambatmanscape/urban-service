'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function AdminDisputesPage() {
  const disputes = [
    {
      id: 1,
      booking: '#12345',
      customer: 'John Doe',
      provider: 'Mike Chen',
      issue: 'Quality issue - work not completed properly',
      status: 'open',
      amount: '$150',
      date: '2025-01-10',
    },
    {
      id: 2,
      booking: '#12344',
      customer: 'Jane Smith',
      provider: 'Sarah Johnson',
      issue: 'Provider no-show',
      status: 'resolved',
      amount: '$120',
      date: '2025-01-08',
    },
    {
      id: 3,
      booking: '#12343',
      customer: 'Bob Johnson',
      provider: 'James Wilson',
      issue: 'Customer cancellation dispute',
      status: 'pending',
      amount: '$200',
      date: '2025-01-09',
    },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dispute Management</h1>
          <p className="text-foreground/60">Review and resolve customer disputes</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="all" className="data-[state=active]:bg-background">
              All Disputes ({disputes.length})
            </TabsTrigger>
            <TabsTrigger value="open" className="data-[state=active]:bg-background">
              Open ({disputes.filter(d => d.status === 'open').length})
            </TabsTrigger>
            <TabsTrigger value="resolved" className="data-[state=active]:bg-background">
              Resolved ({disputes.filter(d => d.status === 'resolved').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {disputes.map((dispute) => (
              <Card key={dispute.id} className="p-6 border border-border">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{dispute.booking}</h3>
                      <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                        dispute.status === 'open'
                          ? 'bg-red-100/20 text-red-700'
                          : dispute.status === 'resolved'
                          ? 'bg-green-100/20 text-green-700'
                          : 'bg-yellow-100/20 text-yellow-700'
                      }`}>
                        {dispute.status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70 mb-3">{dispute.issue}</p>
                    <div className="grid sm:grid-cols-3 gap-4 text-sm text-foreground/60">
                      <div>
                        <span className="text-foreground/40">Customer: </span>
                        {dispute.customer}
                      </div>
                      <div>
                        <span className="text-foreground/40">Provider: </span>
                        {dispute.provider}
                      </div>
                      <div>
                        <span className="text-foreground/40">Date: </span>
                        {dispute.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold mb-4">{dispute.amount}</div>
                    {dispute.status === 'open' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Decline Claim
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve Refund
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="open">
            {disputes.filter(d => d.status === 'open').map((dispute) => (
              <Card key={dispute.id} className="p-6 border border-border">
                <h3 className="font-semibold mb-2">{dispute.booking}</h3>
                <p className="text-sm text-foreground/70 mb-4">{dispute.issue}</p>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resolved">
            {disputes.filter(d => d.status === 'resolved').map((dispute) => (
              <Card key={dispute.id} className="p-6 border border-border">
                <h3 className="font-semibold mb-2">{dispute.booking}</h3>
                <p className="text-sm text-foreground/70">{dispute.issue}</p>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
