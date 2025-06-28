"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Brain, MessageSquare, ArrowRight, Zap, FileText, Search, Shield } from 'lucide-react'

const quickActions = [
  { title: 'Generate RFQ', icon: FileText, description: 'Create acquisition documents' },
  { title: 'Market Research', icon: Search, description: 'Analyze vendor landscape' },
  { title: 'Compliance Check', icon: Shield, description: 'Review FAR requirements' },
  { title: 'Cost Analysis', icon: Zap, description: 'Evaluate pricing strategies' }
]

// Define the message type
interface Message {
  type: 'ai' | 'user';
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: 'Hello! I\'m your AI assistant powered by OpenAI. I can help you with acquisition planning, document generation, compliance reviews, and FAR 13 requirements. What would you like assistance with today?'
    }
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return
    
    setMessages(prev => [...prev, { type: 'user', content: message }])
    setMessage('')
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'I understand you need help with that. Let me analyze your request and provide you with the most relevant information based on current FAR 13 regulations and best practices.'
      }])
    }, 1000)
  }

  return (
    <>
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span>AI Assistant</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Get instant help with acquisition planning, document generation, and compliance reviews powered by OpenAI.
          </p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-primary to-primary/80">
                Start Conversation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>AI Assistant</span>
                  <div className="flex items-center space-x-1 ml-auto">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 p-4 border rounded-lg bg-muted/50 max-h-96">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-background border'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex items-center space-x-2 p-2 h-auto text-left justify-start"
                    onClick={() => setMessage(action.title)}
                  >
                    <action.icon className="h-4 w-4" />
                    <div>
                      <div className="text-xs font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about FAR 13 requirements..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:shadow-xl transition-all z-50"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </>
  )
}