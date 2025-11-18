'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, FileText, CreditCard } from 'lucide-react'
import { useState } from 'react'

interface BookingStepsProps {
  currentStep: number
  totalSteps: number
  bookingData: any
  setBookingData: (data: any) => void
}

export function BookingSteps({
  currentStep,
  totalSteps,
  bookingData,
  setBookingData,
}: BookingStepsProps) {
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const services = [
    { id: 1, name: 'Emergency Repair', price: 150, duration: '2 hours' },
    { id: 2, name: 'Regular Maintenance', price: 85, duration: '1.5 hours' },
    { id: 3, name: 'Installation', price: 120, duration: '3 hours' },
  ]

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toISOString().split('T')[0]
  })

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Service</h2>
            <div className="space-y-3">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className={`p-4 border-2 cursor-pointer transition-smooth ${
                    selectedService === service.id
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/40'
                  }`}
                  onClick={() => {
                    setSelectedService(service.id)
                    setBookingData({ ...bookingData, service: service.name })
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                      <p className="text-sm text-foreground/60">{service.duration}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${service.price}</div>
                      <div className="text-xs text-foreground/60">Total</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Date</h2>
            <div className="grid grid-cols-4 gap-2">
              {dates.map((date) => (
                <Card
                  key={date}
                  className={`p-3 text-center cursor-pointer border-2 transition-smooth ${
                    selectedDate === date
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/40'
                  }`}
                  onClick={() => {
                    setSelectedDate(date)
                    setBookingData({ ...bookingData, date })
                  }}
                >
                  <div className="text-sm font-medium">
                    {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Time</h2>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedTime(time)
                    setBookingData({ ...bookingData, time })
                  }}
                  className="w-full"
                >
                  {time}
                </Button>
              ))}
            </div>
            <Card className="p-4 border border-border bg-muted/30">
              <p className="text-sm text-foreground/70">
                Provider will arrive within the selected time window. You can track their location in real-time.
              </p>
            </Card>
          </div>
        )

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Details & Location</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Service Location</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={bookingData.location}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Details</label>
                <textarea
                  placeholder="Describe the work needed, any special requests, etc."
                  value={bookingData.description}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent h-32 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Photos (optional)</label>
                <Button variant="outline" className="w-full">
                  Choose Files
                </Button>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            <div className="space-y-3">
              {[
                { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                { id: 'upi', name: 'UPI / Digital Wallet', icon: CreditCard },
                { id: 'cash', name: 'Cash on Service', icon: CreditCard },
              ].map((method) => (
                <Card
                  key={method.id}
                  className={`p-4 border-2 cursor-pointer transition-smooth ${
                    bookingData.paymentMethod === method.id
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/40'
                  }`}
                  onClick={() =>
                    setBookingData({ ...bookingData, paymentMethod: method.id })
                  }
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{method.name}</h3>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        bookingData.paymentMethod === method.id
                          ? 'border-accent'
                          : 'border-foreground/30'
                      }`}
                    >
                      {bookingData.paymentMethod === method.id && (
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              <Card className="p-4 border border-border bg-muted/30">
                <p className="text-sm text-foreground/70">
                  Your payment is secure and encrypted. You can save your payment method for future bookings.
                </p>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="p-8 border border-border">
      {/* Step Indicator */}
      <div className="flex justify-between items-center mb-8">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-smooth ${
                step <= currentStep
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-border text-foreground/60'
              }`}
            >
              {step}
            </div>
            {step < totalSteps && (
              <div
                className={`w-12 h-1 mx-2 transition-smooth ${
                  step < currentStep ? 'bg-accent' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {renderStep()}
    </Card>
  )
}
