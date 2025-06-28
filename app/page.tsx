import { Dashboard } from '@/components/dashboard'
import { Navbar } from '@/components/navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Dashboard />
      </main>
    </div>
  )
}