'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { CheckCircle, FileText, CreditCard } from 'lucide-react'

export default function ProviderOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    experience: '',
    serviceArea: '',
    bankAccount: '',
  })

  const steps = [
    { number: 1, title: 'Basic Info', icon: FileText },
    { number: 2, title: 'Services', icon: FileText },
    { number: 3, title: 'Verification', icon: FileText },
    { number: 4, title: 'Payment Setup', icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Become a Service Provider</h1>
        <p className="text-foreground/60 mb-8">Complete your profile in 4 steps</p>

        {/* Step Progress */}
        <div className="flex justify-between mb-12">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 transition-smooth ${
                  currentStep >= step.number
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-foreground/60'
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle size={20} />
                ) : (
                  step.number
                )}
              </div>
              <span className="text-xs text-foreground/60 text-center">{step.title}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <Card className="p-8 border border-border">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Services</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
                  >
                    <option>Select a service</option>
                    <option>Plumbing</option>
                    <option>Cleaning</option>
                    <option>Electrical</option>
                    <option>Tutoring</option>
                    <option>Pet Care</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Years of Experience</label>
                  <input
                    type="number"
                    placeholder="15"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Service Area (km radius)</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={formData.serviceArea}
                    onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Verification</h2>
              <p className="text-foreground/60 mb-6">
                Upload your ID and any relevant certifications
              </p>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Upload ID Document
                </Button>
                <Button variant="outline" className="w-full">
                  Upload Certification
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Payment Setup</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Bank Account</label>
                  <input
                    type="text"
                    placeholder="Your bank account details"
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex-1"
            >
              Back
            </Button>
            {currentStep < 4 && (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1"
              >
                Next
              </Button>
            )}
            {currentStep === 4 && (
              <Button className="flex-1">Complete Onboarding</Button>
            )}
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
