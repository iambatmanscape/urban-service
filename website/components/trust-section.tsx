import { Card } from '@/components/ui/card'
import { CheckCircle2, Lock, Clock, Users } from 'lucide-react'

const benefits = [
  {
    icon: CheckCircle2,
    title: 'Verified Professionals',
    description: 'All providers go through identity and background verification',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'Pay securely with encrypted transactions and buyer protection',
  },
  {
    icon: Clock,
    title: 'Real-time Tracking',
    description: 'Track your service provider with live location updates',
  },
  {
    icon: Users,
    title: 'Trusted Community',
    description: 'Join 50,000+ customers with 4.8★ average ratings',
  },
]

export function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why trust ServiceHub</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Safety, security, and quality are at the heart of everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card
                key={index}
                className="p-6 border border-border hover:border-accent/40 transition-smooth"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-foreground/60 text-sm">{benefit.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
