'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-foreground">
          ServiceHub
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/categories" className="text-foreground/70 hover:text-foreground transition-smooth">
            Services
          </Link>
          <Link href="/how-it-works" className="text-foreground/70 hover:text-foreground transition-smooth">
            How it works
          </Link>
          <Link href="/about" className="text-foreground/70 hover:text-foreground transition-smooth">
            About
          </Link>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="flex flex-col gap-4 p-4">
              <Link href="/categories" className="text-foreground/70">Services</Link>
              <Link href="/how-it-works" className="text-foreground/70">How it works</Link>
              <Link href="/about" className="text-foreground/70">About</Link>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
