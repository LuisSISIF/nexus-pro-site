'use server';

/**
 * @fileOverview Predicts future stock needs based on sales data.
 *
 * - predictStockNeeds - A function that handles the sales data analysis and stock prediction process.
 * - SalesPredictionInput - The input type for the predictStockNeeds function.
 * - SalesPredictionOutput - The return type for the predictStockNeeds function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SalesPredictionInputSchema = z.object({
  salesData: z
    .string()
    .describe(
      'Sales data in a format that can be parsed, such as CSV or JSON.  Include product name, date, and quantity sold.'
    ),
  currentStockLevels: z
    .string()
    .describe(
      'Current stock levels for each product, in a format that can be parsed, such as CSV or JSON. Include product name and current stock level.'
    ),
});
export type SalesPredictionInput = z.infer<typeof SalesPredictionInputSchema>;

const SalesPredictionOutputSchema = z.object({
  predictedStockNeeds: z
    .string()
    .describe(
      'Predicted stock needs for each product, including the product name and quantity needed.'
    ),
  analysis: z
    .string()
    .describe(
      'An analysis of the sales data, including trends and seasonality.'
    ),
  confidenceLevel: z
    .string()
    .describe(
      'A measure of the confidence level of the prediction, as a percentage.'
    ),
});
export type SalesPredictionOutput = z.infer<typeof SalesPredictionOutputSchema>;

export async function predictStockNeeds(input: SalesPredictionInput): Promise<SalesPredictionOutput> {
  return predictStockNeedsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'salesPredictionPrompt',
  input: {schema: SalesPredictionInputSchema},
  output: {schema: SalesPredictionOutputSchema},
  prompt: `You are an expert in sales data analysis and stock prediction.

You will use the sales data and current stock levels to predict future stock needs for each product.
Analyze the sales data for trends and seasonality.
Provide a confidence level for the prediction.

Sales Data: {{{salesData}}}
Current Stock Levels: {{{currentStockLevels}}}

Return the predicted stock needs, analysis, and confidence level. The predicted stock needs MUST include the product name and the quantity needed. The confidence level MUST be a percentage.
Do not make up any data, only use the data provided to calculate the predictions.
`,
});

const predictStockNeedsFlow = ai.defineFlow(
  {
    name: 'predictStockNeedsFlow',
    inputSchema: SalesPredictionInputSchema,
    outputSchema: SalesPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
