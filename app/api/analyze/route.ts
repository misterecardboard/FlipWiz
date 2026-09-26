import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const front = body.front;
    const back = body.back || null;
    const sport = body.sport || "Auto Detect";

    if (!front) {
      return NextResponse.json(
        { error: "Front image is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const cardContent: any[] = [
      {
        type: "input_image",
        image_url: `data:image/jpeg;base64,${front}`,
        detail: "low",
      },
    ];

    if (back) {
      cardContent.push({
        type: "input_image",
        image_url: `data:image/jpeg;base64,${back}`,
        detail: "low",
      });
    }

    cardContent.push({
      type: "input_text",
      text: `
You are MISTER E AI inside FlipWiz.

Identify and research the trading card shown in the images.

Category: ${sport}

Use web search to verify important facts.

Prioritize:

- exact card/set
- athlete or character
- year
- brand
- set
- card number
- parallel/variant
- rookie status
- serial number
- autograph
- relic
- important card history
- athlete/character history
- condition observations

Rules:

- Never invent facts.
- If something cannot be verified, say "Not verified."
- Do not claim authenticity.
- Do not assign a professional grade.
- Do not invent market value.
- Return ONLY valid JSON.

Return this structure:

{
  "card_information": {
    "title": "",
    "athlete_or_character": "",
    "sport": "",
    "year": "",
    "brand": "",
    "set": "",
    "card_number": "",
    "parallel_or_variant": "",
    "rookie_card": "",
    "serial_number": "",
    "autograph": "",
    "relic": "",
    "special_features": "",
    "condition_observations": ""
  },
  "history": {
    "card_history": "",
    "athlete_or_character_history": ""
  },
  "why_this_card_matters": "",
  "listing_description": "",
  "social_media_post_ideas": [
    "",
    "",
    ""
  ],
  "hashtags": [
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  "content_ideas": [
    "",
    "",
    ""
  ]
}

Keep every field concise.
`,
    });

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-5.6-luna",
          reasoning: {
            effort: "none",
          },
          input: [
            {
              role: "user",
              content: cardContent,
            },
          ],
          tools: [
            {
              type: "web_search",
            },
          ],
          tool_choice: "required",
          max_output_tokens: 2200,
        }),
      }
    );

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error(
        "OpenAI API Error:",
        JSON.stringify(data, null, 2)
      );

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "OpenAI request failed.",
        },
        { status: openaiResponse.status }
      );
    }

    let outputText = "";

    const output = Array.isArray(data.output)
      ? data.output
      : [];

    for (const item of output) {
      if (!Array.isArray(item.content)) {
        continue;
      }

      for (const part of item.content) {
        if (
          part &&
          part.type === "output_text" &&
          typeof part.text === "string"
        ) {
          outputText += part.text;
        }
      }
    }

    if (!outputText) {
      return NextResponse.json(
        { error: "MISTER E AI returned no analysis." },
        { status: 500 }
      );
    }

    outputText = outputText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let result;

    try {
      result = JSON.parse(outputText);
    } catch {
      console.error("Invalid JSON from Mister E AI:", outputText);

      return NextResponse.json(
        {
          error:
            "MISTER E AI returned an invalid analysis format.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Mister E AI route error:", error);

    return NextResponse.json(
      {
        error: "Unable to analyze the card.",
      },
      { status: 500 }
    );
  }
}
