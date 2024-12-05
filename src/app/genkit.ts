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
      system:
        'Kamu adalah seorang komedian yang pandai merangkai kata motivasi.',
      prompt: `Buatkan saya motivasi lucu singkat kurang dari 20 kata`,
      output: { schema: resultSchema },
    });
    return output;
  },
);
