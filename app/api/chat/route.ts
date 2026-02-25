import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { buildSystemPrompt, buildUserPrompt } from "@/prompt/tripPrompt";
import { generatedItinerarySchema } from "@/types/itinerary";
import transformIntent from "@/prompt/transform";
import { tripIntentSchema, type TripIntent } from "@/lib/validations/trips";
import { ProxyAgent, fetch as undiciFetch } from "undici";

const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
const proxyFetch = proxyUrl
  ? (url: any, init?: any) =>
      undiciFetch(url, {
        ...init,
        dispatcher: new ProxyAgent(proxyUrl),
      } as any)
  : undefined;

const google = createGoogleGenerativeAI({ fetch: proxyFetch as any });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = tripIntentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const formData: TripIntent = parsed.data;
  const intent = transformIntent(formData);
  const userPrompt = buildUserPrompt(intent);
  const model = google("gemini-2.5-flash");

  const { output } = await generateText({
    model,
    prompt: buildSystemPrompt() + userPrompt,
    output: Output.object({
      name: "Itinerary",
      description: "Structured multi-day travel itinerary",
      schema: generatedItinerarySchema,
    }),
  });

  return NextResponse.json({ itinerary: output });
}
