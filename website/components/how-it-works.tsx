import { Card } from '@/components/ui/card'
import { Search, Calendar, Zap } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Find',
    description: 'Search for services in your area with detailed filters and reviews',
  },
  {
    icon: Calendar,
    title: 'Book',
    description: 'Choose your preferred time slot and add details about your job',
  },
  {
    icon: Zap,
    title: 'Done',
    description: 'Track your service in real-time and pay securely after completion',
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Three simple steps to get your service done
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <Icon size={32} className="text-accent" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-4xl font-bold text-foreground/20">{index + 1}</span>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-foreground/60 max-w-xs">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
