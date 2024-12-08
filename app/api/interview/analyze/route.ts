import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { question, answer } = await request.json();

        // Prepare the prompt for the AI  
        const prompt = `  
      Analyze the following job interview response:  
      Question (${question.type}): ${question.text}  
      Answer: ${answer}  

      Evaluate the response considering:  
      1. Relevance to the question  
      2. ${question.type === 'technical' ? 'Technical accuracy and depth' : 'Communication and soft skills'}  
      3. Clarity and structure  

      Provide a score out of 100 and brief feedback.  
    `;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4",
            temperature: 0.7,
        });

        const analysis = completion.choices[0].message.content;

        return NextResponse.json({ analysis });
    } catch (error) {
        console.error("Error analyzing interview response:", error);
        return NextResponse.json(
            { error: "Failed to analyze response" },
            { status: 500 }
        );
    }
}  