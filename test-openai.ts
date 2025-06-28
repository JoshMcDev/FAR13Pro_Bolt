import 'dotenv/config';
import { knowledgeService } from './services/knowledge';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testOpenAIGeneration() {
  const prompt = "Generate a sample acquisition plan for purchasing IT equipment under FAR 13 simplified acquisition procedures.";
  const response = await knowledgeService.generateText(prompt);
  console.log("OpenAI Response:\n", response);
}

testOpenAIGeneration(); 