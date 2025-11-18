'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [userType, setUserType] = useState<'customer' | 'provider'>('customer')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Signup:', { ...formData, userType })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-8 border border-border">
          <h1 className="text-2xl font-bold mb-2">Create account</h1>
          <p className="text-foreground/60 mb-6">Join ServiceHub today</p>

          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(['customer', 'provider'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setUserType(type)}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition-smooth capitalize ${
                  userType === type
                    ? 'border-accent bg-accent/5 text-accent'
                    : 'border-border hover:border-accent/40 text-foreground'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-accent"
              />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="rounded mt-1" />
              <p className="text-sm text-foreground/60">
                I agree to the{' '}
                <Link href="/terms" className="text-accent hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>

            <Button className="w-full py-2" size="lg">
              Create account
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-foreground/60 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-accent hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
