"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ChevronDown, Filter, Brain, Search, FileText, Building2, FileCheck, Award, Shield, DollarSign, BarChart3, TrendingUp, Users, Target } from 'lucide-react'

const workflowPhases = [
  {
    id: 'planning',
    title: 'Requirements & Planning',
    status: 'active' as const,
    progress: 75,
    items: [
      { name: 'Technical Specifications', status: 'completed' as const, icon: Brain },
      { name: 'Market Research Report', status: 'completed' as const, icon: Search },
      { name: 'Acquisition Plan', status: 'in-progress' as const, icon: FileText },
      { name: 'Small Business Analysis', status: 'pending' as const, icon: Building2 }
    ]
  },
  {
    id: 'solicitation',
    title: 'Solicitation Development',
    status: 'pending' as const,
    progress: 0,
    items: [
      { name: 'RFQ/RFP Generation', status: 'pending' as const, icon: FileCheck },
      { name: 'Commercial Item Determination', status: 'pending' as const, icon: Award },
      { name: 'OPSEC Review', status: 'pending' as const, icon: Shield },
      { name: 'Fiscal Law Review', status: 'pending' as const, icon: DollarSign }
    ]
  },
  {
    id: 'evaluation',
    title: 'Evaluation & Award',
    status: 'pending' as const,
    progress: 0,
    items: [
      { name: 'Vendor Analysis', status: 'pending' as const, icon: BarChart3 },
      { name: 'Pricing Analysis', status: 'pending' as const, icon: TrendingUp },
      { name: 'Past Performance Review', status: 'pending' as const, icon: Users },
      { name: 'Contract Award', status: 'pending' as const, icon: Target }
    ]
  }
]

export function WorkflowProgress() {
  const [activeWorkflow, setActiveWorkflow] = useState(0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Acquisition Workflow</CardTitle>
        <Button variant="ghost" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {workflowPhases.map((phase, index) => (
          <div
            key={phase.id}
            className={`border rounded-lg transition-all cursor-pointer ${
              activeWorkflow === index 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setActiveWorkflow(activeWorkflow === index ? -1 : index)}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    phase.status === 'active' 
                      ? 'bg-primary text-primary-foreground' 
                      : phase.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium">{phase.title}</h3>
                    <p className="text-sm text-muted-foreground">{phase.progress}% complete</p>
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${activeWorkflow === index ? 'rotate-180' : ''}`} />
              </div>
              
              <div className="mt-4">
                <Progress value={phase.progress} className="h-2" />
              </div>
            </div>
            
            {activeWorkflow === index && (
              <div className="border-t p-4 bg-muted/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {phase.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className="flex items-center space-x-3 p-3 bg-background rounded-lg border"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        item.status === 'completed' 
                          ? 'bg-green-500 text-white'
                          : item.status === 'in-progress'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className={`text-xs capitalize ${
                          item.status === 'completed' 
                            ? 'text-green-600'
                            : item.status === 'in-progress'
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`}>
                          {item.status.replace('-', ' ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}