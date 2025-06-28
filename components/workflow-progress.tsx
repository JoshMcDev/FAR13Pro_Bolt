"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  ChevronDown, Filter,
  Settings, Target, FileText, ClipboardList, ListChecks, CheckCircle,
  Search, Barcode, Users, Mail, BadgeCheck, Calculator, ShieldCheck, UserCheck, Scale, EyeOff,
  FileCheck, Stamp, Tag, BookOpen, Truck, AlertTriangle,
  ListOrdered, Contact2, FilePlus, FileSignature,
  ClipboardCheck, DollarSign, List, ThumbsUp, MessageCircle, Grid, UserPlus
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { generateTextViaApi } from '@/services/generateTextViaApi'
import * as FileSaver from 'file-saver'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import jsPDF from 'jspdf'
import { supabaseService } from '@/services/supabase'
import type { Acquisition, Document as AcquisitionDocument } from '@/types'

const workflowPhases = [
  {
    id: 'planning',
    title: 'Refine Requirements',
    status: 'completed' as const,
    progress: 100,
    items: [
      { name: 'Technical Specifications', status: 'completed' as const, icon: Settings },
      { name: 'Statement of Objectives', status: 'completed' as const, icon: Target },
      { name: 'Statement of Work', status: 'completed' as const, icon: FileText },
      { name: 'Performance Work Statement', status: 'completed' as const, icon: ClipboardList },
      { name: 'Performance Requirements Specification', status: 'completed' as const, icon: ListChecks },
      { name: 'Quality Assurance Surveillance Plan', status: 'completed' as const, icon: CheckCircle },
    ]
  },
  {
    id: 'market-intelligence',
    title: 'Market Intelligence',
    status: 'active' as const,
    progress: 75,
    items: [
      { name: 'Market Research Report (Deep Research)', status: 'completed' as const, icon: Search },
      { name: 'NAICS, PSC Codes, & SB Size', status: 'completed' as const, icon: Barcode },
      { name: 'Competitive, Sole Source, SB, or Full & Open Analysis', status: 'in-progress' as const, icon: Users },
      { name: 'Industry Request for Information / Sources Sought', status: 'pending' as const, icon: Mail },
      { name: 'Commercial Item Determination', status: 'in-progress' as const, icon: BadgeCheck },
      { name: 'Independent Government Estimate', status: 'in-progress' as const, icon: Calculator },
      { name: 'Inherently Governmental Functions D&F', status: 'in-progress' as const, icon: ShieldCheck },
      { name: 'Personnel Services D&F', status: 'in-progress' as const, icon: UserCheck },
      { name: 'Fiscal Law Review', status: 'in-progress' as const, icon: Scale },
      { name: 'OPSEC Review', status: 'in-progress' as const, icon: EyeOff }
    ]
  },
  {
    id: 'acquisition-planning',
    title: 'Acquisition Planning',
    status: 'pending' as const,
    progress: 0,
    items: [
      { name: 'Determinations and Findings', status: 'pending' as const, icon: FileCheck },
      { name: 'Justification and Approval', status: 'pending' as const, icon: Stamp },
      { name: 'Brand Name Justification', status: 'pending' as const, icon: Tag },
      { name: 'Acquisition Plan (Reasoning)', status: 'pending' as const, icon: BookOpen },
      { name: 'Logistics and Sustainment Considerations', status: 'pending' as const, icon: Truck },
      { name: 'Risk Management', status: 'pending' as const, icon: AlertTriangle }
    ]
  },
  {
    id: 'solicitation',
    title: 'Solicitation',
    status: 'pending' as const,
    progress: 0,
    items: [
      { name: 'Evaluation Criteria', status: 'pending' as const, icon: ListOrdered },
      { name: 'Recommended Sources & Contact Info', status: 'pending' as const, icon: Contact2 },
      { name: 'Request for Quote', status: 'pending' as const, icon: FilePlus },
      { name: 'Request for Proposal', status: 'pending' as const, icon: FileSignature }
    ]
  },
  {
    id: 'evaluation',
    title: 'Evaluation',
    status: 'pending' as const,
    progress: 0,
    items: [
      { name: 'Abstract', status: 'pending' as const, icon: FileText },
      { name: 'Technical Review', status: 'pending' as const, icon: ClipboardCheck },
      { name: 'Pricing Analysis', status: 'pending' as const, icon: DollarSign },
      { name: 'Other Factors Considered', status: 'pending' as const, icon: List },
      { name: 'Fair and Reasonable Determination', status: 'pending' as const, icon: ThumbsUp },
      { name: 'Responsibility Determination', status: 'pending' as const, icon: UserCheck },
      { name: 'Offeror Debriefs', status: 'pending' as const, icon: MessageCircle }
    ]
  },
  {
    id: 'award',
    title: 'Award',
    status: 'pending' as const,
    progress: 0,
    items: [
      { name: 'Contract Generation', status: 'pending' as const, icon: FileText },
      { name: 'Clause Matrix', status: 'pending' as const, icon: Grid },
      { name: 'COR Appointment', status: 'pending' as const, icon: UserPlus },
      { name: 'Contract File Checklist', status: 'pending' as const, icon: ClipboardList }
    ]
  }
]

// Each phase: number icon bg is 500, item icon bg is 100, item icon color is 600
const phaseStyles: Record<string, { numberBg: string; itemIconBg: string; itemIcon: string }> = {
  planning: { numberBg: 'bg-green-500', itemIconBg: 'bg-green-100', itemIcon: 'text-green-600' },
  'market-intelligence': { numberBg: 'bg-cyan-500', itemIconBg: 'bg-cyan-100', itemIcon: 'text-cyan-600' },
  'acquisition-planning': { numberBg: 'bg-pink-500', itemIconBg: 'bg-pink-100', itemIcon: 'text-pink-600' },
  solicitation: { numberBg: 'bg-lime-500', itemIconBg: 'bg-lime-100', itemIcon: 'text-lime-600' },
  evaluation: { numberBg: 'bg-orange-500', itemIconBg: 'bg-orange-100', itemIcon: 'text-orange-600' },
  award: { numberBg: 'bg-indigo-500', itemIconBg: 'bg-indigo-100', itemIcon: 'text-indigo-600' },
}

// Placeholder async function for report generation
async function generateReport(reportType: string, context: string, onProgress: (p: number) => void) {
  // Simulate progress
  for (let i = 1; i <= 100; i += 10) {
    await new Promise(res => setTimeout(res, 80))
    onProgress(i)
  }
  // Simulate OpenAI call
  await new Promise(res => setTimeout(res, 400))
  return `Generated report for ${reportType} with context: ${context}`
}

// NOTE: status must be one of: 'planning', 'solicitation', 'evaluation', 'awarded'
const initialAcquisition: Acquisition = {
  id: 'demo-acq-1',
  title: 'Demo Acquisition',
  description: '1 x 2025 Ford F150, V8, 4x4',
  status: 'planning', // start at allowed value
  location_mode: 'CONUS',
  estimated_value: 50000,
  progress: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  user_id: 'demo-user-1',
}

// Market Research Report template
const marketResearchTemplate = (requirement: string) => `
I. Executive Summary

Provide a concise overview of key findings, directly addressing the government's need for [${requirement}]. Include assessment of market maturity, available sources, estimated acquisition cost, and a preliminary recommendation for acquisition strategy (e.g., full and open competition, small business set-aside, sole source).

II. Overview of [${requirement}] and Key Capabilities

Briefly define what the [${requirement}] is and explain its mission utility, major technical specifications, and relevance to defense operations. Highlight key capabilities that differentiate it in terms of performance, maturity, and mission impact.

III. Requirement Definition & Scope
    •    Government Requirement: [Define the operational need and reference any draft SOW or PWS.]
    •    VARIABLE Description: [Technical details, functions, performance requirements, relevant standards.]
    •    Scope: [Geographic limitations, quantities, functionalities, logistics.]
    •    NAICS Code(s): [List applicable NAICS with justification.]
    •    PSC(s): [Primary and secondary PSC codes with reasoning.]
    •    Small Business Size Standard: [Per NAICS; determine eligibility for small business set-aside.]

IV. Market Research Objectives

Clarify specific goals of this market research effort:
    •    Understand commercial availability of [${requirement}]
    •    Identify potential vendors and their capabilities
    •    Explore feasibility of full and open competition vs. sole source
    •    Assess pricing, cost realism, sustainment models
    •    Determine socioeconomic participation opportunities
    •    Establish technical and acquisition risks and mitigation

V. TEPSE Analysis

A. Technological
    •    State-of-the-Art and maturity (TRL)
    •    Key performance metrics
    •    Technology refresh cycle and rate of innovation
    •    Risks: obsolescence, integration, IP barriers

B. Economic
    •    Market size (defense and commercial)
    •    Historical and projected unit cost
    •    Pricing data, cost drivers, cost estimating basis for IGE
    •    Life cycle and sustainment costs

C. Political/Legal
    •    Regulatory issues (ITAR, EAR, FAA, etc.)
    •    Mandates or incentives impacting acquisition
    •    IP ownership or license considerations
    •    Export, cybersecurity, spectrum compliance

D. Social
    •    Industrial base maturity and labor market
    •    Vendor workforce scalability
    •    Supply chain domestic sourcing

E. Environmental
    •    Lifecycle environmental impact
    •    Sustainability standards and compliance
    •    Disposal, recyclability, and footprint

VI. SWOT Analysis

Strengths    Weaknesses
[Example]    [Example]

Opportunities    Threats
[Example]    [Example]

VII. Supplier & Industry Landscape

Vendor Name    Location    CAGE    Status    Socio Status    Capability    Past Performance
[Vendor]    [City]    [#]    Active    [SB, 8a, etc]    [Yes/No]    [Summary]

SAM.gov Verification: [Include registration and CAGE verification screenshot if required.]

Market Participation: [Number and type of vendors able to fulfill requirement.]

VIII. Competition Feasibility

State whether the acquisition can be competitively awarded:
    •    Small business set-aside potential
    •    Barriers to competition
    •    Proprietary solutions or critical differentiators

IX. Cost and Contracting Strategy
    •    Estimated IGE Range
    •    Recommended Contract Type (e.g., FFP, CPFF)
    •    Pricing justification (based on historical data or quotes)
    •    Government-wide or agency-wide vehicles available

X. Market Research Methodology

List the sources and approaches used:
    •    FPDS, SAM.gov, GSA, SBA tools
    •    Vendor interviews or industry days
    •    Trade literature and vendor sites
    •    RFI/RFQ responses if applicable

X.1 Risk Assessment & Mitigation

Risk Category    Description of Risk    Mitigation Strategy
[Technological]    [Description]    [Mitigation]
[Cost]    [Description]    [Mitigation]
[Schedule]    [Description]    [Mitigation]

XI. Automatic Justification and Approval (if Sole Source Recommended)

Authority: FAR 6.302-1 / 6.302-6
Contract Type: [e.g., FFP Purchase Order]
Estimated Value: [$ amount]
Security Classification: [Unclassified/Secret]
JA Number: [TBD or formatted number]

Justification Summary:
[Explain why only one responsible source can fulfill the requirement. Cite national security or proprietary limits. Describe prior use, urgency, or operational need.]

XII. Appendices
    •    Vendor Research Log
    •    Technical Specifications or Fact Sheets
    •    CAGE Code Screenshots
    •    FPDS Award History
    •    Cost Benchmarks and Graphs
    •    Small Business Assessment
    •    Literature Review or Source Documentation
`;

export function WorkflowProgress() {
  const [activeWorkflow, setActiveWorkflow] = useState(0)
  const [acquisitionNote, setAcquisitionNote] = useState("")
  const [generating, setGenerating] = useState<{ phaseIdx: number; itemIdx: number } | null>(null)
  const [progress, setProgress] = useState(0)
  const [generatedReport, setGeneratedReport] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<string>("")
  const [modalTitle, setModalTitle] = useState<string>("")
  const [showFollowUp, setShowFollowUp] = useState(false)
  const [customTemplate, setCustomTemplate] = useState<File | null>(null)
  const [hasProfileTemplate, setHasProfileTemplate] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [acquisition, setAcquisition] = useState<Acquisition>(initialAcquisition)
  const [requirementPromptOpen, setRequirementPromptOpen] = useState(false)
  const [requirementPromptValue, setRequirementPromptValue] = useState("")
  const [clarificationPromptOpen, setClarificationPromptOpen] = useState(false)
  const [clarificationPromptValue, setClarificationPromptValue] = useState("")
  const [llmSuggestion, setLlmSuggestion] = useState<string | null>(null)
  const [associatedDocs, setAssociatedDocs] = useState<AcquisitionDocument[]>([])
  const [conversationHistory, setConversationHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])

  // Simulate checking for a profile template (replace with real logic)
  // useEffect(() => { setHasProfileTemplate(true/false) }, [])

  // Workflow phase order (must match allowed backend values)
  const phaseOrder: Acquisition['status'][] = [
    'planning',
    'solicitation',
    'evaluation',
    'awarded',
  ]

  // Map workflowPhases to allowed status values for backend
  const phaseMap: Record<string, Acquisition['status']> = {
    'planning': 'planning',
    'market-intelligence': 'planning', // Map to planning or next closest
    'acquisition-planning': 'planning',
    'solicitation': 'solicitation',
    'evaluation': 'evaluation',
    'award': 'awarded',
  }

  // Get next phase
  const getNextPhase = (current: Acquisition['status']) => {
    const idx = phaseOrder.indexOf(current)
    return idx >= 0 && idx < phaseOrder.length - 1 ? phaseOrder[idx + 1] : null
  }

  // Helper to get requirement context from all sources
  const getRequirementContext = async () => {
    if (acquisitionNote) return acquisitionNote
    if (acquisition?.description) return acquisition.description
    // TODO: Add logic for "Acquisition in Progress" if tracked separately
    return null
  }

  // Helper to fetch associated documents
  const fetchAssociatedDocuments = async () => {
    if (!acquisition?.id) return []
    try {
      const docs = await supabaseService.getDocuments(acquisition.id)
      setAssociatedDocs(docs)
      return docs
    } catch {
      setAssociatedDocs([])
      return []
    }
  }

  // Helper to prompt user for requirement (multi-turn)
  const promptUserForRequirement = async () => {
    setRequirementPromptOpen(true)
    return new Promise<string>((resolve) => {
      const handler = async (val: string) => {
        setRequirementPromptValue("")
        // Add user message to conversation
        setConversationHistory((prev) => [...prev, { role: 'user', content: val }])
        // Send to OpenAI for LLM assistance
        const aiResponse = await generateTextViaApi(
          conversationHistory.concat({ role: 'user', content: val }).map(m => `${m.role}: ${m.content}`).join('\n'),
          { temperature: 0.5, max_tokens: 500 }
        )
        setConversationHistory((prev) => [...prev, { role: 'assistant', content: aiResponse }])
        // If LLM says requirement is clear, resolve; else, keep dialog open for more turns
        if (/ready|sufficient|generate|proceed|good/i.test(aiResponse)) {
          setRequirementPromptOpen(false)
          resolve(val)
        } else {
          setRequirementPromptValue("")
        }
      }
      (window as any).onRequirementPromptConfirm = handler
    })
  }

  // Helper to prompt user for clarification (multi-turn)
  const promptUserForClarification = async (suggestion: string) => {
    setLlmSuggestion(suggestion)
    setClarificationPromptOpen(true)
    return new Promise<string>((resolve) => {
      const handler = async (val: string) => {
        setClarificationPromptValue("")
        setConversationHistory((prev) => [...prev, { role: 'user', content: val }])
        // Send to OpenAI for LLM assistance
        const aiResponse = await generateTextViaApi(
          conversationHistory.concat({ role: 'user', content: val }).map(m => `${m.role}: ${m.content}`).join('\n'),
          { temperature: 0.5, max_tokens: 500 }
        )
        setConversationHistory((prev) => [...prev, { role: 'assistant', content: aiResponse }])
        // If LLM says clarification is sufficient, resolve; else, keep dialog open for more turns
        if (/ready|sufficient|generate|proceed|good/i.test(aiResponse)) {
          setClarificationPromptOpen(false)
          setLlmSuggestion(null)
          resolve(val)
        } else {
          setClarificationPromptValue("")
        }
      }
      (window as any).onClarificationPromptConfirm = handler
    })
  }

  // Main handler for workflow item click
  const handleItemClick = async (phaseIdx: number, itemIdx: number, itemName: string) => {
    setGenerating({ phaseIdx, itemIdx })
    setProgress(0)
    setGeneratedReport(null)
    setModalContent("")
    setModalTitle(itemName)
    setModalOpen(true)
    setShowFollowUp(false)

    // 1. Gather requirement context
    let requirement = await getRequirementContext()
    if (!requirement) {
      requirement = await promptUserForRequirement()
      if (!requirement) {
        setModalContent('No requirement provided. Cannot generate report.')
        setGenerating(null)
        return
      }
    }

    // 2. Fetch associated documents
    const docs = await fetchAssociatedDocuments()
    const docsContext = docs.length > 0 ? `\n\nAssociated Documents:\n${docs.map(d => d.content).join('\n\n')}` : ''
    let context = `${requirement}${docsContext}`

    // 3. Generate report with OpenAI, handle clarification loop
    let report = ''
    let clarificationNeeded = false
    let clarificationSuggestion = ''
    do {
      clarificationNeeded = false
      setProgress(10)
      let prompt = ''
      if (itemName === 'Market Research Report (Deep Research)') {
        prompt = `You are a government market research analyst. Using the following template, generate a comprehensive Market Research Report for the requirement: ${requirement}. Use all available context and associated documents. Fill out each section in detail.\n\n${marketResearchTemplate(requirement)}${docsContext}`
      } else {
        prompt = `Generate a ${itemName} for the following requirement: ${context}`
      }
      try {
        for (let i = 1; i <= 80; i += 10) {
          await new Promise(res => setTimeout(res, 60))
          setProgress(i)
        }
        report = await generateTextViaApi(prompt)
        setProgress(100)
        // Heuristic: If OpenAI asks for clarification, prompt user
        if (/clarify|more information|please provide/i.test(report)) {
          clarificationNeeded = true
          clarificationSuggestion = report
          const userClarification = await promptUserForClarification(report)
          context += `\nAdditional info: ${userClarification}`
        }
      } catch (e) {
        setModalContent('Error generating report. Please try again.')
        setGenerating(null)
        return
      }
    } while (clarificationNeeded)

    setGeneratedReport(report)
    setModalContent(report)
    setShowFollowUp(true)
    setGenerating(null)
  }

  // Download as DOCX
  const handleDownloadDocx = () => {
    if (!modalContent) return
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(modalContent)],
            }),
          ],
        },
      ],
    })
    Packer.toBlob(doc).then(blob => {
      FileSaver.saveAs(blob, `${modalTitle.replace(/\s+/g, '_')}.docx`)
    })
  }

  // Download as PDF
  const handleDownloadPdf = () => {
    if (!modalContent) return
    const doc = new jsPDF()
    doc.text(modalContent, 10, 10)
    doc.save(`${modalTitle.replace(/\s+/g, '_')}.pdf`)
  }

  const handleUseCustomTemplate = (file?: File) => {
    if (file) setCustomTemplate(file)
    // TODO: Upload and associate template to user profile, then use it for report formatting
  }

  const handleNextProcess = async () => {
    const nextPhase = getNextPhase(acquisition.status)
    if (!nextPhase) {
      alert('Already at final phase!')
      return
    }
    try {
      const updated = await supabaseService.updateAcquisition(acquisition.id, { status: nextPhase })
      setAcquisition(updated)
      alert(`Advanced to next phase: ${nextPhase}`)
    } catch (e) {
      alert('Failed to update acquisition phase.')
    }
  }

  const handleRegenerateFidelity = async () => {
    setIsRegenerating(true)
    setProgress(0)
    setModalContent('')
    // Compose prompt
    const prompt = `Generate a ${modalTitle} for the following requirement: ${acquisitionNote}`
    try {
      for (let i = 1; i <= 80; i += 10) {
        await new Promise(res => setTimeout(res, 60))
        setProgress(i)
      }
      // Lower temperature, higher max tokens for more fidelity
      const report = await generateTextViaApi(prompt, { temperature: 0.2, max_tokens: 3000 })
      setProgress(100)
      setGeneratedReport(report)
      setModalContent(report)
    } catch (e) {
      setModalContent('Error generating report. Please try again.')
    }
    setIsRegenerating(false)
  }

  return (
    <>
      <Dialog open={requirementPromptOpen} onOpenChange={setRequirementPromptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Requirement</DialogTitle>
          </DialogHeader>
          <div className="mb-2 max-h-32 overflow-y-auto text-xs bg-muted rounded p-2">
            {conversationHistory.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left text-primary'}>
                <span className="font-bold">{m.role === 'user' ? 'You' : 'AI'}:</span> {m.content}
              </div>
            ))}
          </div>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mt-2"
            placeholder="Describe your acquisition requirement..."
            value={requirementPromptValue}
            onChange={e => setRequirementPromptValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') (window as any).onRequirementPromptConfirm?.(requirementPromptValue) }}
          />
          <DialogFooter>
            <Button onClick={() => (window as any).onRequirementPromptConfirm?.(requirementPromptValue)}>
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={clarificationPromptOpen} onOpenChange={setClarificationPromptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>More Information Needed</DialogTitle>
          </DialogHeader>
          <div className="mb-2 max-h-32 overflow-y-auto text-xs bg-muted rounded p-2">
            {conversationHistory.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left text-primary'}>
                <span className="font-bold">{m.role === 'user' ? 'You' : 'AI'}:</span> {m.content}
              </div>
            ))}
          </div>
          {llmSuggestion && <div className="mb-2 text-sm text-muted-foreground">{llmSuggestion}</div>}
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mt-2"
            placeholder="Provide additional details..."
            value={clarificationPromptValue}
            onChange={e => setClarificationPromptValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') (window as any).onClarificationPromptConfirm?.(clarificationPromptValue) }}
          />
          <DialogFooter>
            <Button onClick={() => (window as any).onClarificationPromptConfirm?.(clarificationPromptValue)}>
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-sm">
            {progress < 100 ? (
              <div className="flex flex-col items-center gap-2 py-8">
                <span className="text-primary font-semibold">Generating report...</span>
                <Progress value={progress} className="h-2 w-full max-w-md" />
                <span className="text-xs text-muted-foreground">{progress}%</span>
              </div>
            ) : (
              modalContent
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleDownloadDocx} disabled={!modalContent}>Download DOCX</Button>
            <Button onClick={handleDownloadPdf} disabled={!modalContent}>Download PDF</Button>
          </DialogFooter>
          {showFollowUp && (
            <div className="mt-6 border-t pt-4">
              <p className="font-medium mb-2">What would you like to do next?</p>
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Use Custom Template */}
                {hasProfileTemplate || customTemplate ? (
                  <Button variant="secondary" onClick={() => handleUseCustomTemplate(customTemplate!)}>
                    Use Custom Template
                  </Button>
                ) : (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="file"
                      accept=".docx,.pdf,.template"
                      className="hidden"
                      onChange={e => handleUseCustomTemplate(e.target.files?.[0] || undefined)}
                    />
                    <Button variant="secondary" asChild>
                      <span>Upload & Use Custom Template</span>
                    </Button>
                  </label>
                )}
                {/* Execute Next Process */}
                <Button variant="secondary" onClick={handleNextProcess}>
                  Execute Next Process in Workflow
                </Button>
                {/* Regenerate with more fidelity */}
                <Button variant="secondary" onClick={handleRegenerateFidelity} disabled={isRegenerating}>
                  {isRegenerating ? 'Regenerating...' : 'Regenerate with More Fidelity'}
                </Button>
              </div>
              {customTemplate && <span className="text-xs text-muted-foreground mt-1 block">Selected template: {customTemplate.name}</span>}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex w-full items-center gap-4">
            <CardTitle className="text-lg sm:text-xl whitespace-nowrap">Acquisition Studio</CardTitle>
            <input
              type="text"
              className="flex-1 border border-input rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background min-w-0"
              placeholder="Enter a requirement or current acquisition document request."
              value={acquisitionNote}
              onChange={e => setAcquisitionNote(e.target.value)}
              aria-label="Acquisition requirement or status"
            />
          </div>
          <Button variant="ghost" size="icon" className="self-end sm:self-auto">
            <Filter className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {workflowPhases.map((phase, phaseIdx) => (
            <div
              key={phase.id}
              className={`border rounded-lg transition-all cursor-pointer ${
                activeWorkflow === phaseIdx 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setActiveWorkflow(activeWorkflow === phaseIdx ? -1 : phaseIdx)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${phaseStyles[phase.id]?.numberBg || ''} text-white`}>
                      {phaseIdx + 1}
                    </div>
                    <div>
                      <h3 className="font-medium">{phase.title}</h3>
                    </div>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeWorkflow === phaseIdx ? 'rotate-180' : ''}`} />
                </div>
              </div>
              {activeWorkflow === phaseIdx && (
                <div className="border-t p-4 bg-muted/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.items.map((item, itemIdx) => {
                      const isGenerating = generating && generating.phaseIdx === phaseIdx && generating.itemIdx === itemIdx
                      return (
                        <div 
                          key={itemIdx} 
                          className="flex items-center space-x-3 p-3 bg-background rounded-lg border cursor-pointer"
                          onClick={() => handleItemClick(phaseIdx, itemIdx, item.name)}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${phaseStyles[phase.id]?.itemIconBg || ''}`}>
                            <item.icon className={`h-5 w-5 ${phaseStyles[phase.id]?.itemIcon || 'text-gray-400'}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            {isGenerating && (
                              <div className="mt-1">
                                <p className="text-xs text-primary font-semibold">Generating...</p>
                                <Progress value={progress} className="h-2 mt-1" />
                                <p className="text-xs text-muted-foreground mt-1">{progress}%</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}