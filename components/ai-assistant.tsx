"use client"

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Brain, MessageSquare, ArrowRight, Zap, FileText, Search, Shield } from 'lucide-react'
import { generateTextViaApi } from '@/services/generateTextViaApi'

const quickActions = [
  { title: 'Generate RFQ', icon: FileText, description: 'Create acquisition documents' },
  { title: 'Market Research', icon: Search, description: 'Analyze vendor landscape' },
  { title: 'D&F Generator', icon: Shield, description: 'Create D&F documents' },
  { title: 'Price Analysis', icon: Zap, description: 'Evaluate pricing strategies' }
]

// Simple spinner component
function SpinnerIcon() {
  return <svg className="animate-spin h-4 w-4 text-primary" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>;
}

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  // Focus input after sending
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, loading])

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return
    
    setMessages(prev => [...prev, { type: 'user', content: message }])
    setMessage('')
    setLoading(true)
    setError(null)
    
    // Call the API route for AI response
    try {
      const aiResponse = await generateTextViaApi(message)
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }])
    } catch (err) {
      setMessages(prev => [...prev, { type: 'ai', content: 'Sorry, there was an error generating a response.' }])
      setError('Sorry, there was an error generating a response.')
    } finally {
      setLoading(false)
      if (inputRef.current) inputRef.current.focus()
    }
  }

  return (
    <>
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20" aria-label="AI Assistant Chat">
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
              <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80">
                <span>Start Conversation</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col" aria-modal="true" role="dialog">
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
              <div className="flex-1 overflow-y-auto space-y-4 p-4 border rounded-lg bg-muted/50 max-h-96" aria-live="polite">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    aria-label={msg.type === 'user' ? 'User message' : 'AI message'}
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
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex items-center space-x-2 p-2 h-auto text-left justify-start"
                    onClick={() => setMessage(action.title)}
                    aria-label={action.title}
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
                  ref={inputRef}
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about FAR 13 requirements..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  aria-label="Type your message"
                  disabled={loading}
                />
                <Button onClick={handleSendMessage} size="icon" disabled={loading || !message.trim()} aria-label="Send message">
                  {loading ? <SpinnerIcon /> : <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
              {loading && <div className="text-xs text-muted-foreground mt-2">AI is thinking...</div>}
              {error && <div className="text-xs text-red-500 mt-2" role="alert">{error}</div>}
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
          aria-label="Open AI Assistant Chat"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </>
  )
}