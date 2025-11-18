'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useState } from 'react'
import { BookingSteps } from '@/components/booking-steps'
import { BookingSummary } from '@/components/booking-summary'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight, ChevronLeft } from 'lucide-react'

interface BookingPageProps {
  params: {
    id: string
  }
}

export default function BookingPage({ params }: BookingPageProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    location: '',
    description: '',
    paymentMethod: 'card',
  })

  const totalSteps = 5

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleBooking = () => {
    console.log('Booking confirmed:', bookingData)
    // Here you would submit the booking
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Book Service</h1>
        <p className="text-foreground/60 mb-8">
          You're booking with <span className="font-semibold">John Smith</span>
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <BookingSteps
              currentStep={currentStep}
              totalSteps={totalSteps}
              bookingData={bookingData}
              setBookingData={setBookingData}
            />

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft size={16} />
                Back
              </Button>

              {currentStep < totalSteps && (
                <Button
                  onClick={handleNext}
                  className="gap-2"
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              )}

              {currentStep === totalSteps && (
                <Button
                  onClick={handleBooking}
                  className="gap-2"
                >
                  Confirm Booking
                  <ChevronRight size={16} />
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <BookingSummary providerId={params.id} bookingData={bookingData} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
