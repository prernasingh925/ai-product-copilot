import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PRODUCT_MANAGER_PROMPT } from '@/prompts/productManager';

export async function POST(req: NextRequest) {
    try {
        const { idea, audience, industry } = await req.json();

        if (!idea) {
            return NextResponse.json(
                { error: 'Product Idea is required.' },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('GEMINI_API_KEY is missing from environment variables');
            return NextResponse.json(
                { error: 'API key not configured. Please add GEMINI_API_KEY to your environment variables.' },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // Or gemini-1.5-pro

        const prompt = `
      ${PRODUCT_MANAGER_PROMPT}
      
      Here is the information to process:
      Product Idea: ${idea}
      Target Users: ${audience || 'Not specified'}
      Industry: ${industry || 'Not specified'}
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ result: text });

    } catch (error: any) {
        console.error('Error generating product plan:', error);

        return NextResponse.json(
            {
                error: 'Failed to generate product plan. Please check your API key and try again.',
                details: error.message
            },
            { status: 500 }
        );
    }
}
