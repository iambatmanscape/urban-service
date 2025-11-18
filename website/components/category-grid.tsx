import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wrench, Home, BookOpen, Scissors, PawPrint, ShoppingBag } from 'lucide-react'

const categories = [
  { name: 'Plumbing', icon: Wrench, count: '2.5K providers', color: 'from-blue-500 to-blue-600' },
  { name: 'Cleaning', icon: Home, count: '4.2K providers', color: 'from-emerald-500 to-emerald-600' },
  { name: 'Tutoring', icon: BookOpen, count: '1.8K providers', color: 'from-purple-500 to-purple-600' },
  { name: 'Hair & Beauty', icon: Scissors, count: '3.1K providers', color: 'from-pink-500 to-pink-600' },
  { name: 'Pet Care', icon: PawPrint, count: '892 providers', color: 'from-orange-500 to-orange-600' },
  { name: 'Errands', icon: ShoppingBag, count: '1.5K providers', color: 'from-indigo-500 to-indigo-600' },
]

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-background to-orange-100/50 dark:to-orange-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-orange-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Popular services
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl">
            Browse from a wide range of services or search for something specific
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Card
                key={category.name}
                className="group relative overflow-hidden p-6 hover:shadow-2xl transition-smooth cursor-pointer border border-border hover:border-accent/60 rounded-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-smooth`} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}>
                      <Icon size={28} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-smooth">{category.name}</h3>
                  <p className="text-foreground/60 text-sm mb-6 font-medium">{category.count}</p>
                  <Button
                    className="w-full text-sm font-semibold h-11 bg-gradient-to-r from-accent/80 to-accent hover:shadow-lg text-white rounded-lg transition-smooth"
                    asChild
                  >
                    <a href={`/search?category=${category.name.toLowerCase()}`}>
                      Browse Services
                    </a>
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
