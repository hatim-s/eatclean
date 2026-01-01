import { VoyageAIClient } from "voyageai";

const voyage = new VoyageAIClient({
  apiKey: process.env.VOYAGE_API_KEY!,
});

// Voyage AI has a limit of 128 texts per request
const BATCH_SIZE = 128;
const EMBEDDING_MODEL = "voyage-3-lite";

export async function getEmbeddings(
  texts: string[],
  inputType: "document" | "query" = "document"
): Promise<number[][]> {
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
      throw new Error(
        `Failed to generate embeddings for batch starting at ${i}`,
        { cause: error }
      );
    }

    if (response.data && response.data.length > 0) {
      allEmbeddings.push(...response.data.map((d) => d.embedding!));
    } else {
      throw new Error(
        `Failed to generate embeddings for batch starting at ${i}`,
        { cause: { response } }
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
