import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, CheckCircle } from 'lucide-react'

export function LocationStatus() {
  const locationMode = 'CONUS'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Location Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current Mode</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            locationMode === 'CONUS' 
              ? 'bg-blue-500 text-white' 
              : 'bg-orange-500 text-white'
          }`}>
            {locationMode}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Compliance Rules</span>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">SAM.gov Status</span>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </div>
      </CardContent>
    </Card>
  )
}