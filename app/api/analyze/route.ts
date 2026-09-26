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

    const content: any[] = [
      {
        type: "input_image",
        image_url: `data:image/jpeg;base64,${front}`,
        detail: "low",
      },
    ];

    if (back) {
      content.push({
        type: "input_image",
        image_url: `data:image/jpeg;base64,${back}`,
        detail: "low",
      });
    }

    content.push({
      type: "input_text",
      text: `
You are MISTER E AI inside FlipWiz.

Your job is to identify a trading card and research its current resale market.

Category: ${sport}

FIRST: Identify the exact card as accurately as possible.

SECOND: Research recent comparable sales using web search.

Search specifically for:
- Exact card
- Exact year
- Exact set
- Exact card number
- Exact parallel or variation if applicable
- Recent sold/completed sales
- eBay sold listings or other reliable sales sources
- PSA/graded sales separately from raw/ungraded sales when possible

Do NOT confuse:
- Base cards with parallels
- Raw cards with graded cards
- Different years
- Different card numbers
- Different variations

For market research, prioritize sales that closely match the identified card.

Return ONLY valid JSON.

Use this structure:

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

  "market_research": {
    "market_status": "",
    "raw_average": 0,
    "raw_low": 0,
    "raw_high": 0,
    "graded_average": 0,
    "recommended_market_value": 0,
    "confidence": "",
    "comparable_sales": [
      {
        "date": "",
        "price": 0,
        "condition": "",
        "grade": "",
        "marketplace": "",
        "description": "",
        "source": ""
      }
    ]
  },

  "flip_analysis": {
    "recommended_market_value": 0,
    "suggested_max_buy": 0,
    "reason": ""
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
  ]
}

IMPORTANT RULES:

1. Never invent a sale.
2. Never invent a price.
3. Never invent a source.
4. If a value cannot be verified, use 0.
5. If there are not enough comparable sales, say so.
6. Clearly distinguish raw and graded cards.
7. Do not treat asking prices as sold prices.
8. Do not claim authenticity.
9. Do not assign a professional grading score.
10. Use "Not verified" when identification is uncertain.
11. A comparable sale should only be included when you can identify the card and sale information with reasonable confidence.
12. Return no markdown.
13. Return JSON only.
`,
    });

    const response = await fetch(
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
              content,
            },
          ],
          tools: [
            {
              type: "web_search",
            },
          ],
          tool_choice: "required",
          max_output_tokens: 3500,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
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
        { status: response.status }
      );
    }

    let outputText = "";

    if (Array.isArray(data.output)) {
      for (const item of data.output) {
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
    }

    if (!outputText) {
      return NextResponse.json(
        {
          error: "Mister E AI returned no analysis.",
        },
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
    } catch (parseError) {
      console.error(
        "Invalid JSON returned by Mister E AI:",
        outputText,
        parseError
      );

      return NextResponse.json(
        {
          error:
            "Mister E AI returned an invalid analysis format.",
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
