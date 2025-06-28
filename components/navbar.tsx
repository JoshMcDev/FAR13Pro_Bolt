"use client"

import { useState } from 'react'
import { Shield, Menu, X, Bell, Settings, User, ChevronDown, BookOpenCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/auth-provider'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [locationMode, setLocationMode] = useState<'CONUS' | 'OCONUS'>('CONUS')
  const { user, signOut } = useAuth()

  const navItems = ['Dashboard', 'Acquisitions', 'Documents', 'Analytics']

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                <BookOpenCheck className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">FAR 13 Pro</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Location Toggle */}
            <div className="hidden md:flex items-center rounded-lg border bg-muted p-1">
              <Button
                variant={locationMode === 'CONUS' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLocationMode('CONUS')}
              >
                CONUS
              </Button>
              <Button
                variant={locationMode === 'OCONUS' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLocationMode('OCONUS')}
              >
                OCONUS
              </Button>
            </div>

            {/* Notifications and Settings */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            {/* User Menu */}
            {user && (
              <div className="hidden sm:flex items-center space-x-3 rounded-lg border bg-muted px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Demo User</span>
                  <span className="text-xs text-muted-foreground">Contracting Officer</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}