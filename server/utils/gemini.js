// Using direct fetch instead of SDK for better compatibility

export const generateQuizWithAI = async (prompt, toughness, numQuestions, numOptions) => {
  const aiPrompt = `Generate a quiz with exactly ${numQuestions} questions about: "${prompt}".
Difficulty: ${toughness} (easy/medium/hard).
Each question must have exactly ${numOptions} options.

Return ONLY valid JSON in this format:
{
  "title": "Quiz title here",
  "questions": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",
      "explanation": "Why this is correct"
    }
  ]
}
No extra text, no markdown, just JSON.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: aiPrompt }] }]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]) {
      throw new Error('No response from Gemini API');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Clean markdown code blocks if present
    const cleanedResponse = generatedText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error('Quiz generation error:', error);
    throw error;
  }
};
