import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const recentActivity = [
  { action: 'Acquisition Plan generated', time: '2 hours ago', status: 'completed' },
  { action: 'Market research updated', time: '4 hours ago', status: 'completed' },
  { action: 'NAICS code verified', time: '1 day ago', status: 'completed' },
  { action: 'Small business coordination initiated', time: '2 days ago', status: 'in-progress' }
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivity.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              activity.status === 'completed' ? 'bg-green-500' : 'bg-primary'
            }`} />
            <div>
              <p className="text-sm font-medium">{activity.action}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}