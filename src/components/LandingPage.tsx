import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Shield, 
  Brain, 
  Database, 
  FileText, 
  Search, 
  Users, 
  Award, 
  BarChart3, 
  CheckCircle, 
  Globe, 
  Lock, 
  Zap, 
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  Star,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  Building2,
  Briefcase,
  Settings,
  Download,
  Eye,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { PremiumLogo } from './PremiumLogo';

export const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const screenshots = [
    { title: 'Spend Analysis Dashboard', description: 'Real-time procurement analytics' },
    { title: 'Generated QASP Document', description: 'AI-powered quality assurance' },
    { title: 'NAICS Code Suggestions', description: 'Smart classification assistance' },
    { title: 'Market Research Report', description: 'Automated vendor analysis' }
  ];

  const workflowPhases = [
    {
      id: 'requirements',
      title: 'Requirements Studio',
      subtitle: 'LLM-assisted requirement refinement',
      icon: FileText,
      features: [
        'LLM-assisted drafting of Technical Specifications and SOO/SOW/PWS documents',
        'Automatic generation of PRS & QASP tailored to input requirements'
      ]
    },
    {
      id: 'market',
      title: 'Market Intelligence',
      subtitle: 'Automated market analysis reports',
      icon: Search,
      features: [
        'Deep-dive spend analysis and pricing benchmarks',
        'NAICS/PSC code recommendations and Small Business size standards'
      ]
    },
    {
      id: 'planning',
      title: 'Planning & Coordination',
      subtitle: 'Acquisition planning with built-in guidance',
      icon: Target,
      features: [
        'Auto-generate complete Acquisition Plan with rationale and decision traceability',
        'Pre-filled DD2579 small-business coordination and IGCE development support'
      ]
    },
    {
      id: 'engagement',
      title: 'Industry Engagement',
      subtitle: 'Pre-solicitation compliance & outreach',
      icon: Users,
      features: [
        'One-click RFI/Sources Sought notices integrated with SAM.gov',
        'Automated Commercial Item Determinations, J&A, and D&F generation'
      ]
    },
    {
      id: 'solicitation',
      title: 'Solicitation & Evaluation',
      subtitle: 'RFQ/RFP generation and proposal analysis',
      icon: Award,
      features: [
        'RFQ/RFP builder with CLINs and tailored clause library',
        'Vendor abstracts with pricing and past performance analysis'
      ]
    },
    {
      id: 'award',
      title: 'Award & Compliance',
      subtitle: 'Award issuance and compliance checks',
      icon: CheckCircle,
      features: [
        'Award document issuance with email distribution and tracking',
        'Built-in contract file checklist and debrief letter generation'
      ]
    },
    {
      id: 'analytics',
      title: 'Post-Award Analytics',
      subtitle: 'Insights and reporting after award',
      icon: BarChart3,
      features: [
        'Interactive dashboards tracking procurement lead time and cost savings',
        'Comprehensive PDF/CSV reports with custom performance alerts'
      ]
    }
  ];

  const integrations = [
    { name: 'SAM.gov Integration', description: 'Real-time entity validation and Reps & Certs' },
    { name: 'Custom AI Services', description: 'Specialized endpoints for specification drafting' },
    { name: 'FedRAMP Cloud', description: 'FISMA-compliant infrastructure with IL5 readiness' }
  ];

  const securityFeatures = [
    { icon: Shield, title: 'CAC/PIV Login', description: 'Federal smart card authentication' },
    { icon: Lock, title: 'AES-256 Encryption', description: 'Data protection at rest and in transit' },
    { icon: Eye, title: 'Audit Trails', description: 'Immutable logs for compliance' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F111A] text-[#ECEFF4] overflow-x-hidden">
      {/* Navigation */}
      <nav className="relative bg-[#0F111A]/95 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <PremiumLogo />
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {['Features', 'Workflow', 'Security', 'Pricing'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[#A3A8B8] hover:text-[#ECEFF4] font-medium transition-colors py-2 px-1"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button 
                className="px-6 py-2 text-[#A3A8B8] hover:text-[#ECEFF4] border border-slate-700 hover:border-slate-600 rounded-lg transition-all"
                whileHover={{ scale: 1.02 }}
              >
                Watch Demo
              </motion.button>
              <motion.button 
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[#A3A8B8] hover:text-[#ECEFF4]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-slate-800/50 py-4"
              >
                <div className="space-y-4">
                  {['Features', 'Workflow', 'Security', 'Pricing'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="block px-4 py-2 text-[#A3A8B8] hover:text-[#ECEFF4]">
                      {item}
                    </a>
                  ))}
                  <div className="px-4 pt-4 space-y-3">
                    <button className="w-full px-6 py-2 text-[#A3A8B8] border border-slate-700 rounded-lg">
                      Watch Demo
                    </button>
                    <button className="w-full px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-medium">
                      Get Started
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Map */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-transparent"></div>
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            {/* Simplified world map outline */}
            <path d="M200 300 Q300 250 400 300 L500 280 Q600 290 700 300 L800 320 Q900 310 1000 330" 
                  stroke="currentColor" strokeWidth="1" opacity="0.3" />
            {/* Pulsing nodes for key locations */}
            <circle cx="300" cy="280" r="4" fill="currentColor" className="animate-pulse" opacity="0.6" />
            <circle cx="600" cy="300" r="4" fill="currentColor" className="animate-pulse" opacity="0.6" />
            <circle cx="850" cy="320" r="4" fill="currentColor" className="animate-pulse" opacity="0.6" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-[#ECEFF4] mb-6 leading-tight">
                Streamline FAR 13 Simplified Acquisitions —{' '}
                <span className="text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text">
                  Anywhere
                </span>
              </h1>
              
              <p className="text-xl text-[#A3A8B8] mb-8 leading-relaxed">
                AI-powered SOW/PWS drafting • Market Research • RFQ/RFP to Award • Analytics
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.button 
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
                
                <motion.button 
                  className="px-8 py-4 border-2 border-slate-600 hover:border-slate-500 text-[#ECEFF4] rounded-xl font-medium transition-all flex items-center justify-center space-x-2 hover:bg-slate-800/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-[#A3A8B8]">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-teal-400" />
                  <span>FedRAMP Authorized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-teal-400" />
                  <span>FISMA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-teal-400" />
                  <span>Section 508</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-[#A3A8B8]">FAR 13 Pro Dashboard</span>
                </div>
                
                {/* Rotating Screenshots */}
                <div className="relative h-64 bg-slate-900/50 rounded-lg overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentScreenshot}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <BarChart3 className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-medium text-[#ECEFF4] mb-2">
                          {screenshots[currentScreenshot].title}
                        </h3>
                        <p className="text-sm text-[#A3A8B8]">
                          {screenshots[currentScreenshot].description}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Screenshot Indicators */}
                <div className="flex justify-center space-x-2 mt-4">
                  {screenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScreenshot(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentScreenshot ? 'bg-teal-400' : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow Phases */}
      <section id="workflow" className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#ECEFF4] mb-4">
              Complete Acquisition Workflow
            </h2>
            <p className="text-xl text-[#A3A8B8] max-w-3xl mx-auto">
              From requirements definition to post-award analytics, FAR 13 Pro guides you through every step with AI assistance and automation.
            </p>
          </motion.div>

          {/* Phase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {workflowPhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-6 rounded-xl border transition-all cursor-pointer ${
                  activePhase === index
                    ? 'bg-gradient-to-br from-teal-900/30 to-cyan-900/30 border-teal-500/50'
                    : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'
                }`}
                onClick={() => setActivePhase(activePhase === index ? -1 : index)}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activePhase === index
                      ? 'bg-gradient-to-br from-teal-500 to-cyan-500'
                      : 'bg-slate-700'
                  }`}>
                    <phase.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#ECEFF4] text-sm">{phase.title}</h3>
                    <p className="text-xs text-[#A3A8B8]">{phase.subtitle}</p>
                  </div>
                </div>

                <AnimatePresence>
                  {activePhase === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      {phase.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-[#A3A8B8]">{feature}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI & Integrations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - AI Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[#ECEFF4] mb-6">
                Intelligent AI Integration
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#ECEFF4] mb-2">Persistent AI Chatbot</h3>
                    <p className="text-[#A3A8B8]">
                      "Ask FAR13 Bot" is available on every screen, ready to answer acquisition questions or generate documents on-demand. Ask it to "Draft a SOW for landscaping services" and watch it produce a draft instantly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#ECEFF4] mb-2">Smart API Integrations</h3>
                    <p className="text-[#A3A8B8]">
                      Real-time SAM.gov connectivity for entity validation and Reps & Certs retrieval. Custom AI endpoints handle specification drafting, market research, and clause generation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Chat Interface Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium text-[#ECEFF4]">FAR13 Bot</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-[#A3A8B8]">Online</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-sm text-[#ECEFF4]">
                      I can help you draft a comprehensive SOW for landscaping services. Would you like me to include standard clauses for grounds maintenance, seasonal services, and performance standards?
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-lg ml-8">
                    <p className="text-sm text-white">
                      Yes, please include all standard clauses and make it suitable for a 3-year base contract.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Ask about FAR 13 requirements..."
                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-sm text-[#ECEFF4] placeholder-[#A3A8B8] focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-lg">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security & Enterprise */}
      <section id="security" className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#ECEFF4] mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-[#A3A8B8] max-w-3xl mx-auto">
              Built for government standards with comprehensive security, compliance, and audit capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700/50"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#ECEFF4] mb-2">{feature.title}</h3>
                <p className="text-[#A3A8B8]">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Administration Features */}
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-[#ECEFF4] mb-6">Office & Team Management</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-teal-400 mt-1" />
                  <p className="text-[#A3A8B8]">Configure office profiles by DODAAC with role-based permissions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-teal-400 mt-1" />
                  <p className="text-[#A3A8B8]">Shared templates and aggregated analytics for contracting offices</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-teal-400 mt-1" />
                  <p className="text-[#A3A8B8]">Document import/export with one-click ZIP downloads</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-[#ECEFF4] mb-6">Usage Analytics</h3>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-400">8.5</div>
                    <div className="text-sm text-[#A3A8B8]">Avg Days to Award</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">94%</div>
                    <div className="text-sm text-[#A3A8B8]">Process Efficiency</div>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-xs text-[#A3A8B8] mt-2">Team performance metrics</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#ECEFF4] mb-6">
              Ready to Transform Your Acquisition Process?
            </h2>
            <p className="text-xl text-[#A3A8B8] mb-8 max-w-2xl mx-auto">
              Join government contracting officers who are already streamlining their FAR 13 processes with AI-powered automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              
              <motion.button 
                className="px-8 py-4 border-2 border-slate-600 hover:border-slate-500 text-[#ECEFF4] rounded-xl font-medium transition-all flex items-center justify-center space-x-2 hover:bg-slate-800/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Schedule Demo</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <PremiumLogo />
              <p className="text-[#A3A8B8] mt-4 text-sm">
                Streamlining government acquisitions with AI-powered automation and compliance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#ECEFF4] mb-4">Product</h4>
              <div className="space-y-2 text-sm text-[#A3A8B8]">
                <a href="#" className="block hover:text-[#ECEFF4]">Features</a>
                <a href="#" className="block hover:text-[#ECEFF4]">Workflow</a>
                <a href="#" className="block hover:text-[#ECEFF4]">Security</a>
                <a href="#" className="block hover:text-[#ECEFF4]">Integrations</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#ECEFF4] mb-4">Support</h4>
              <div className="space-y-2 text-sm text-[#A3A8B8]">
                <a href="#" className="block hover:text-[#ECEFF4]">Documentation</a>
                <a href="#" className="block hover:text-[#ECEFF4]">Contact Support</a>
                <a href="#" className="block hover:text-[#ECEFF4]">Training</a>
                <a href="#" className="block hover:text-[#ECEFF4]">Status</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#ECEFF4] mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-[#A3A8B8]">
                <a href="#" className="block hover:text-[#ECEFF4]">Privacy Policy</a>
                <a href="#" className="block hover:text-[#ECEFF4]">Terms of Service</a>
                <a href="#" className="block hover:text-[#ECEFF4]">Accessibility</a>
                <a href="#" className="block hover:text-[#ECEFF4]">Compliance</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-[#A3A8B8]">
              © 2025 FAR 13 Pro, Inc. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <span className="text-sm text-[#A3A8B8]">Built for government excellence</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Support */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50"
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
    </div>
  );
};