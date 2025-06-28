import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, FileText, Database } from 'lucide-react'

const quickActions = [
  { title: 'New Acquisition', icon: Plus, gradient: 'from-blue-500 to-purple-600' },
  { title: 'Market Research', icon: Search, gradient: 'from-emerald-500 to-teal-600' },
  { title: 'Generate RFQ', icon: FileText, gradient: 'from-purple-500 to-pink-600' },
  { title: 'SAM.gov Lookup', icon: Database, gradient: 'from-orange-500 to-red-600' }
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex flex-col items-center p-6 h-auto space-y-3 group hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium">{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}