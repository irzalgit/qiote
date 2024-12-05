'use server';

import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: gemini15Flash,
});

const resultSchema = z.object({ quote: z.string() });

export const generateQuoteFlow = ai.defineFlow(
  {
    name: 'generateQuoteFlow',
  },
  async () => {
    const { output } = await ai.generate({
      system: 'Kamu adalah seorang komedian.',
      prompt: `Buatkan saya kata-kata motivasi lucu untuk hari ini, jangan ada yang sama dengan sebelumnya`,
      output: { schema: resultSchema },
    });
    return output;
  },
);
