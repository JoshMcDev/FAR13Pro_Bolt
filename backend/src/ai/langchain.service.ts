import { Injectable } from '@nestjs/common'
import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from 'langchain/prompts'
import { LLMChain } from 'langchain/chains'
import { GenerateDocumentDto } from './dto/ai.dto'

@Injectable()
export class LangChainService {
  private llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-4',
    temperature: 0.7,
  })

  async generateDocument(generateDocumentDto: GenerateDocumentDto) {
    const template = `
    Generate a professional {type} document following government acquisition best practices.

    Requirements: {requirements}
    Context: {context}

    Please create a comprehensive document that includes all necessary sections and follows proper formatting.

    Document:`

    const prompt = PromptTemplate.fromTemplate(template)
    const chain = new LLMChain({ llm: this.llm, prompt })
    
    const result = await chain.call({
      type: generateDocumentDto.type,
      requirements: generateDocumentDto.requirements,
      context: JSON.stringify(generateDocumentDto.context || {})
    })

    return { content: result.text }
  }

  async performComplianceReview(document: string, documentType: string) {
    const template = `
    Perform a comprehensive compliance review of this {documentType} document against relevant regulations.

    Document to Review:
    {document}

    Provide a detailed compliance review including:
    1. Compliance Status
    2. Required Elements Checklist
    3. Identified Issues and Risks
    4. Recommendations for Improvement
    5. Missing Required Elements
    6. Best Practice Suggestions

    Compliance Review:`

    const prompt = PromptTemplate.fromTemplate(template)
    const chain = new LLMChain({ llm: this.llm, prompt })
    
    const result = await chain.call({
      document,
      documentType
    })

    return { content: result.text }
  }
}