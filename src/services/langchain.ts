// LangChain integration for advanced AI workflows
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { Document } from 'langchain/document';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

const llm = new ChatOpenAI({
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  modelName: 'gpt-4',
  temperature: 0.7,
});

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

// FAR 13 Knowledge Base (simplified for demo)
const farKnowledgeBase = [
  {
    section: 'FAR 13.003',
    title: 'Policy',
    content: 'Agencies shall use simplified acquisition procedures to the maximum extent practicable for all purchases of supplies or services not exceeding the simplified acquisition threshold.'
  },
  {
    section: 'FAR 13.106-1',
    title: 'Soliciting competition',
    content: 'Contracting officers shall promote competition to the maximum extent practicable to obtain supplies or services from the source whose proposal represents the best value to the Government.'
  },
  {
    section: 'FAR 13.106-3',
    title: 'Award and documentation',
    content: 'Purchases shall be made from the source whose proposal represents the best value to the Government, price and other factors considered.'
  }
];

export class LangChainService {
  private vectorStore: MemoryVectorStore | null = null;

  async initializeKnowledgeBase() {
    if (this.vectorStore) return;

    const documents = farKnowledgeBase.map(item => 
      new Document({
        pageContent: `${item.section} - ${item.title}: ${item.content}`,
        metadata: { section: item.section, title: item.title }
      })
    );

    this.vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings);
  }

  async queryKnowledgeBase(query: string, k: number = 3) {
    await this.initializeKnowledgeBase();
    if (!this.vectorStore) throw new Error('Knowledge base not initialized');

    const results = await this.vectorStore.similaritySearch(query, k);
    return results;
  }

  async generateAcquisitionPlan(requirements: {
    description: string;
    estimatedValue: number;
    locationMode: 'CONUS' | 'OCONUS';
    urgency: 'standard' | 'urgent';
  }) {
    const template = `
    You are an expert government contracting officer. Generate a comprehensive acquisition plan based on FAR 13 simplified acquisition procedures.

    Requirements:
    - Description: {description}
    - Estimated Value: ${requirements.estimatedValue}
    - Location: {locationMode}
    - Urgency: {urgency}

    Relevant FAR Guidance:
    {farGuidance}

    Generate a detailed acquisition plan including:
    1. Acquisition Strategy
    2. Market Research Plan
    3. Competition Strategy
    4. Small Business Considerations
    5. Risk Assessment
    6. Timeline and Milestones
    7. Required Documentation

    Plan:`;

    const prompt = PromptTemplate.fromTemplate(template);
    
    // Get relevant FAR guidance
    const farResults = await this.queryKnowledgeBase(
      `acquisition planning ${requirements.description} ${requirements.locationMode}`
    );
    const farGuidance = farResults.map(doc => doc.pageContent).join('\n\n');

    const chain = new LLMChain({ llm, prompt });
    
    const result = await chain.call({
      description: requirements.description,
      locationMode: requirements.locationMode,
      urgency: requirements.urgency,
      farGuidance
    });

    return result.text;
  }

  async generateRFQ(requirements: {
    title: string;
    description: string;
    specifications: string;
    deliveryLocation: string;
    deliveryDate: string;
    locationMode: 'CONUS' | 'OCONUS';
  }) {
    const template = `
    Generate a professional Request for Quotation (RFQ) document following FAR 13 simplified acquisition procedures.

    Requirements:
    - Title: {title}
    - Description: {description}
    - Specifications: {specifications}
    - Delivery Location: {deliveryLocation}
    - Delivery Date: {deliveryDate}
    - Location Mode: {locationMode}

    Relevant FAR Guidance:
    {farGuidance}

    Generate a complete RFQ including:
    1. Solicitation Information
    2. Statement of Work/Specifications
    3. Delivery Requirements
    4. Evaluation Criteria
    5. Submission Instructions
    6. Terms and Conditions
    7. Small Business Set-Aside Information (if applicable)

    RFQ Document:`;

    const prompt = PromptTemplate.fromTemplate(template);
    
    const farResults = await this.queryKnowledgeBase(
      `RFQ solicitation ${requirements.locationMode} commercial items`
    );
    const farGuidance = farResults.map(doc => doc.pageContent).join('\n\n');

    const chain = new LLMChain({ llm, prompt });
    
    const result = await chain.call({
      ...requirements,
      farGuidance
    });

    return result.text;
  }

  async performComplianceReview(document: string, documentType: string) {
    const template = `
    Perform a comprehensive compliance review of this {documentType} document against FAR 13 simplified acquisition procedures.

    Document to Review:
    {document}

    Relevant FAR Requirements:
    {farGuidance}

    Provide a detailed compliance review including:
    1. Compliance Status (Compliant/Non-Compliant/Needs Review)
    2. Required Elements Checklist
    3. Identified Issues and Risks
    4. Recommendations for Improvement
    5. Missing Required Clauses or Provisions
    6. Best Practice Suggestions

    Compliance Review:`;

    const prompt = PromptTemplate.fromTemplate(template);
    
    const farResults = await this.queryKnowledgeBase(
      `${documentType} compliance requirements FAR 13`
    );
    const farGuidance = farResults.map(doc => doc.pageContent).join('\n\n');

    const chain = new LLMChain({ llm, prompt });
    
    const result = await chain.call({
      document,
      documentType,
      farGuidance
    });

    return result.text;
  }
}

export const langChainService = new LangChainService();