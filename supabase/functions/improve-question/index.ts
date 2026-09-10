import "@supabase/functions-js/edge-runtime.d.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    console.log("Improve question function started");

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing");

      return new Response(
        JSON.stringify({
          success: false,
          error: "GEMINI_API_KEY is not configured",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const body = await req.json();

    console.log("Received body:", body);

    const { question, description } = body;

    if (!question || !question.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Question title is required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const prompt = `
You are an AI assistant for a college Q&A platform called CampusConnect.

Improve the student's question.

Student Question:
${question}

Additional Description:
${description || "No description provided"}

Return ONLY valid JSON:

{
  "improvedQuestion": "clear improved question",
  "improvedDescription": "clear improved description",
  "tags": ["tag1", "tag2", "tag3"],
  "suggestions": [
    "suggestion 1",
    "suggestion 2"
  ]
}

Rules:
- Keep the original meaning.
- Fix grammar and clarity.
- Do not invent facts.
- Generate 2 to 5 useful tags.
- Keep suggestions short.
`;

    console.log("Calling Gemini...");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
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
            temperature: 0.3,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const geminiText = await response.text();

    console.log("Gemini status:", response.status);
    console.log("Gemini response:", geminiText);

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Gemini API failed",
          details: geminiText,
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const geminiData = JSON.parse(geminiText);

    const generatedText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Gemini returned an empty response",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("Generated text:", generatedText);

    const result = JSON.parse(generatedText);

    return new Response(
      JSON.stringify({
        success: true,
        data: result,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Improve question error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});