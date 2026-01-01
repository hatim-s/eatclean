import { VoyageAIClient } from "voyageai";

const voyage = new VoyageAIClient({
  apiKey: process.env.VOYAGE_API_KEY!,
});

const EMBEDDING_MODEL = "voyage-3-lite";

export async function getEmbedding(text: string): Promise<number[]> {
  const response = await voyage.embed({
    input: [text],
    model: EMBEDDING_MODEL,
    inputType: "query",
  });

  if (response.data && response.data.length > 0) {
    return response.data[0].embedding!;
  }

  throw new Error("Failed to generate embedding");
}

export async function getEmbeddings(
  texts: string[],
  inputType: "document" | "query" = "document"
): Promise<number[][]> {
  // Voyage AI has a limit of 128 texts per request
  const BATCH_SIZE = 128;
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);

    let response = null;
    try {
      response = await voyage.embed({
        input: batch,
        model: EMBEDDING_MODEL,
        inputType,
      });
    } catch (error) {
      console.error(
        `Error generating embeddings for batch starting at ${i}:`,
        error
      );
      throw new Error(
        `Failed to generate embeddings for batch starting at ${i}`
      );
    }

    if (response.data && response.data.length > 0) {
      allEmbeddings.push(...response.data.map((d) => d.embedding!));
    } else {
      throw new Error(
        `Failed to generate embeddings for batch starting at ${i}`
      );
    }
  }

  return allEmbeddings;
}

export function serializeEmbedding(embedding: number[]): string {
  return JSON.stringify(embedding);
}

export function deserializeEmbedding(serialized: string): number[] {
  return JSON.parse(serialized);
}

