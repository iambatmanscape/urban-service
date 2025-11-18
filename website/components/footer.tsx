import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">ServiceHub</h4>
            <p className="text-background/70 text-sm">
              Connecting customers with trusted local service providers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/about" className="hover:text-background transition-smooth">About</Link></li>
              <li><Link href="/careers" className="hover:text-background transition-smooth">Careers</Link></li>
              <li><Link href="/press" className="hover:text-background transition-smooth">Press</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/help" className="hover:text-background transition-smooth">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-background transition-smooth">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-background transition-smooth">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/terms" className="hover:text-background transition-smooth">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-background transition-smooth">Privacy</Link></li>
              <li><Link href="/cookies" className="hover:text-background transition-smooth">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-background/70">
          <p>&copy; 2025 ServiceHub. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-background transition-smooth">Twitter</a>
            <a href="#" className="hover:text-background transition-smooth">Facebook</a>
            <a href="#" className="hover:text-background transition-smooth">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
