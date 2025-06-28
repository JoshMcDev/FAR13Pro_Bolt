import React, { useState } from 'react';
import { 
  FileText, 
  Shield, 
  Brain, 
  Search, 
  Download, 
  MessageSquare, 
  BarChart3, 
  CheckCircle, 
  Globe, 
  Users, 
  DollarSign, 
  Clock,
  ArrowRight,
  Menu,
  X,
  Zap,
  Database,
  Award,
  FileCheck,
  Settings,
  Bell,
  User,
  ChevronDown,
  Plus,
  Filter,
  Calendar,
  Target,
  TrendingUp,
  MapPin,
  Building2,
  Briefcase,
  LogOut,
  Activity,
  PieChart,
  BarChart2,
  CreditCard,
  Wallet
} from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { MetricsCard } from './components/MetricsCard';
import { WorkflowProgress } from './components/WorkflowProgress';
import { DataVisualization } from './components/DataVisualization';
import { AIAssistant } from './components/AIAssistant';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [locationMode, setLocationMode] = useState('CONUS');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const workflowPhases = [
    {
      id: 'planning',
      title: 'Requirements & Planning',
      status: 'active',
      progress: 75,
      items: [
        { name: 'Technical Specifications', status: 'completed', icon: Brain },
        { name: 'Market Research Report', status: 'completed', icon: Search },
        { name: 'Acquisition Plan', status: 'in-progress', icon: FileText },
        { name: 'Small Business Analysis', status: 'pending', icon: Building2 }
      ]
    },
    {
      id: 'solicitation',
      title: 'Solicitation Development',
      status: 'pending',
      progress: 0,
      items: [
        { name: 'RFQ/RFP Generation', status: 'pending', icon: FileCheck },
        { name: 'Commercial Item Determination', status: 'pending', icon: Award },
        { name: 'OPSEC Review', status: 'pending', icon: Shield },
        { name: 'Fiscal Law Review', status: 'pending', icon: DollarSign }
      ]
    },
    {
      id: 'evaluation',
      title: 'Evaluation & Award',
      status: 'pending',
      progress: 0,
      items: [
        { name: 'Vendor Analysis', status: 'pending', icon: BarChart3 },
        { name: 'Pricing Analysis', status: 'pending', icon: TrendingUp },
        { name: 'Past Performance Review', status: 'pending', icon: Users },
        { name: 'Contract Award', status: 'pending', icon: Target }
      ]
    }
  ];

  const quickActions = [
    { title: 'New Acquisition', icon: Plus, gradient: 'from-blue-500 to-purple-600' },
    { title: 'Market Research', icon: Search, gradient: 'from-emerald-500 to-teal-600' },
    { title: 'Generate RFQ', icon: FileText, gradient: 'from-purple-500 to-pink-600' },
    { title: 'SAM.gov Lookup', icon: Database, gradient: 'from-orange-500 to-red-600' }
  ];

  const recentActivity = [
    { action: 'Acquisition Plan generated', time: '2 hours ago', status: 'completed' },
    { action: 'Market research updated', time: '4 hours ago', status: 'completed' },
    { action: 'NAICS code verified', time: '1 day ago', status: 'completed' },
    { action: 'Small business coordination initiated', time: '2 days ago', status: 'in-progress' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-light">
      {/* Top Navigation Bar */}
      <nav className="relative bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left Section - Logo and Navigation */}
            <div className="flex items-center space-x-12">
              {/* Logo Section */}
              <div className="flex items-center space-x-4 py-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-light text-white leading-tight">FAR 13 Pro</span>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {['Dashboard', 'Acquisitions', 'Documents', 'Analytics'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-300 hover:text-white font-light transition-colors py-2 px-1 border-b-2 border-transparent hover:border-purple-400"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Right Section - Controls and User */}
            <div className="flex items-center space-x-6">
              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              
              {/* Location Toggle */}
              <div className="hidden md:flex items-center bg-slate-800/50 backdrop-blur-sm rounded-lg p-1 border border-slate-700/50">
                <button
                  onClick={() => setLocationMode('CONUS')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    locationMode === 'CONUS' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CONUS
                </button>
                <button
                  onClick={() => setLocationMode('OCONUS')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    locationMode === 'OCONUS' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  OCONUS
                </button>
              </div>
              
              {/* Notification and Settings */}
              <div className="hidden sm:flex items-center space-x-3">
                <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all backdrop-blur-sm">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all backdrop-blur-sm">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
              
              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-slate-800/50 backdrop-blur-sm rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer border border-slate-700/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white leading-tight">
                      Demo User
                    </span>
                    <span className="text-xs text-slate-400 leading-tight">
                      Contracting Officer
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-slate-700/50 py-4 space-y-2">
              {['Dashboard', 'Acquisitions', 'Documents', 'Analytics'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
                  {item}
                </a>
              ))}
              
              {/* Mobile Theme Toggle and Location */}
              <div className="px-4 py-3 space-y-3 border-t border-slate-700/50 mt-3 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Theme</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Location</span>
                  <div className="flex items-center bg-slate-800/50 rounded-lg p-1">
                    <button
                      onClick={() => setLocationMode('CONUS')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        locationMode === 'CONUS' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                          : 'text-slate-400'
                      }`}
                    >
                      CONUS
                    </button>
                    <button
                      onClick={() => setLocationMode('OCONUS')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        locationMode === 'OCONUS' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                          : 'text-slate-400'
                      }`}
                    >
                      OCONUS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-light text-white mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Acquisition Dashboard
              </h1>
              <p className="text-slate-400 font-light">Streamlined FAR 13 simplified acquisitions for {locationMode} operations</p>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl">
              <Plus className="h-4 w-4" />
              <span>New Acquisition</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Active Acquisitions"
              value="12"
              icon={Briefcase}
              gradient="from-blue-500 to-cyan-500"
            />
            <MetricsCard
              title="Avg. Processing Time"
              value="8.5 days"
              icon={Clock}
              gradient="from-emerald-500 to-teal-500"
            />
            <MetricsCard
              title="Committed Amount"
              value="$2.4M"
              icon={CreditCard}
              gradient="from-purple-500 to-pink-500"
            />
            <MetricsCard
              title="Obligated Amount"
              value="$1.8M"
              icon={Wallet}
              gradient="from-orange-500 to-red-500"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Workflow Progress */}
          <div className="lg:col-span-2 space-y-8">
            <WorkflowProgress 
              workflowPhases={workflowPhases}
              activeWorkflow={activeWorkflow}
              setActiveWorkflow={setActiveWorkflow}
            />

            {/* Data Visualization */}
            <DataVisualization />

            {/* Quick Actions */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-6">
              <h2 className="text-xl font-light text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 hover:shadow-lg transition-all group bg-slate-900/50 backdrop-blur-sm"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{action.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-6">
              <h3 className="text-lg font-light text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-700/30 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'completed' ? 'bg-emerald-400' : 'bg-blue-400'
                    }`}></div>
                    <div>
                      <p className="text-sm text-slate-200">{activity.action}</p>
                      <p className="text-xs text-slate-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Status */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="h-5 w-5 text-slate-400" />
                <h3 className="text-lg font-light text-white">Location Status</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Current Mode</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    locationMode === 'CONUS' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                      : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  }`}>
                    {locationMode}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Compliance Rules</span>
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">SAM.gov Status</span>
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* AI Assistant Preview */}
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-light text-white">AI Assistant</h3>
              </div>
              <p className="text-sm text-slate-300 mb-4">
                Get instant help with acquisition planning, document generation, and compliance reviews powered by OpenAI and LangChain.
              </p>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
              >
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Component */}
      <AIAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center z-40"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default App;