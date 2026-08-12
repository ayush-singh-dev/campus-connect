const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { question, description, tags = [] } = await req.json();

    // Validate question
    if (!question) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Question is required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Check Gemini API key
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const prompt = `
You are an AI professor helping a college student.

Answer the student's question clearly, accurately, and at a student-friendly level.

QUESTION:
${question}

DESCRIPTION:
${description || "No additional description provided."}

TAGS:
${Array.isArray(tags) ? tags.join(", ") : tags}

Return ONLY valid JSON.

Use exactly this structure:

{
  "explanation": "A clear and detailed explanation of the answer.",
  "keyPoints": [
    "Important point 1",
    "Important point 2",
    "Important point 3"
  ],
  "example": "A simple example if appropriate.",
  "steps": [
    "Step 1",
    "Step 2",
    "Step 3"
  ],
  "flowchart": "Mermaid flowchart if useful, otherwise empty string.",
  "resources": [
    {
      "title": "Resource name or topic",
      "searchQuery": "What the student should search for"
    }
  ]
}

IMPORTANT RULES:

1. Return ONLY JSON.
2. Do not use markdown code fences.
3. Do not put \`\`\`json around the response.
4. Explain the concept for a college student.
5. Give useful examples whenever possible.
6. Give step-by-step instructions when appropriate.
7. If a flowchart would help explain the concept, return valid Mermaid syntax.
8. If a flowchart is not useful, return an empty string.
9. Do NOT invent URLs.
10. For resources, provide reliable resource names and search queries instead of fake URLs.
11. Keep the answer focused on the student's question.
`;

    // Call Gemini
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" +
        encodeURIComponent(GEMINI_API_KEY),
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],

          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      },
    );

    // Gemini error
    if (!response.ok) {
      const errorText = await response.text();

      console.error("Gemini HTTP status:", response.status);

      console.error("Gemini error:", errorText);

      throw new Error(`Gemini API request failed (${response.status})`);
    }

    const result = await response.json();

    console.log("Gemini raw response:", JSON.stringify(result));

    const answerText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answerText) {
      console.error("Unexpected Gemini response:", result);

      throw new Error("Gemini returned an empty answer");
    }

    // Convert Gemini JSON string into JavaScript object
    let answer;

    try {
      answer = JSON.parse(answerText);
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON:", answerText);

      throw new Error("Gemini returned invalid JSON");
    }

    // Make sure fields always exist
    answer = {
      explanation: answer.explanation || "",
      keyPoints: Array.isArray(answer.keyPoints) ? answer.keyPoints : [],
      example: answer.example || "",
      steps: Array.isArray(answer.steps) ? answer.steps : [],
      flowchart: answer.flowchart || "",
      resources: Array.isArray(answer.resources) ? answer.resources : [],
    };

    console.log("Final AI answer:", answer);

    // Send structured response to React
    return new Response(
      JSON.stringify({
        success: true,
        data: answer,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Answer AI error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});
