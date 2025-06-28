import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, PieChart, TrendingUp, Activity } from 'lucide-react'

const chartData = [
  { name: 'Q1', value: 85, color: 'from-blue-500 to-cyan-500' },
  { name: 'Q2', value: 92, color: 'from-purple-500 to-pink-500' },
  { name: 'Q3', value: 78, color: 'from-emerald-500 to-teal-500' },
  { name: 'Q4', value: 96, color: 'from-orange-500 to-red-500' }
]

const pieData = [
  { name: 'Small Business', value: 68, color: 'from-blue-500 to-cyan-500' },
  { name: 'Large Business', value: 32, color: 'from-purple-500 to-pink-500' }
]

export function DataVisualization() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Performance Analytics</CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <PieChart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Quarterly Performance</span>
            </h3>
            <div className="space-y-3">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground w-8">{item.name}</span>
                  <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pie Chart Representation */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Business Distribution</span>
            </h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg, #3b82f6 0deg, #06b6d4 ${68 * 3.6}deg, #8b5cf6 ${68 * 3.6}deg, #ec4899 360deg)`
                  }}
                />
                <div className="absolute inset-4 bg-background rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">68%</div>
                    <div className="text-xs text-muted-foreground">Small Biz</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}