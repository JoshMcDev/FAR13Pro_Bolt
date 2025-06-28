import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, Clock, CreditCard, Wallet } from 'lucide-react'

const metrics = [
  {
    title: 'Active Acquisitions',
    value: '12',
    icon: Briefcase,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Avg. Processing Time',
    value: '8.5 days',
    icon: Clock,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Committed Amount',
    value: '$2.4M',
    icon: CreditCard,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Obligated Amount',
    value: '$1.8M',
    icon: Wallet,
    gradient: 'from-orange-500 to-red-500',
  },
]

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                <p className="text-3xl font-bold">{metric.value}</p>
              </div>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <metric.icon className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
          <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
        </Card>
      ))}
    </div>
  )
}