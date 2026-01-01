import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

const EMBEDDING_MODEL = "embed-english-v3.0";

export async function getEmbedding(text: string): Promise<number[]> {
  const response = await cohere.embed({
    texts: [text],
    model: EMBEDDING_MODEL,
    inputType: "search_query",
  });

  if (response.embeddings && "float" in response.embeddings) {
    return response.embeddings.float![0];
  }

  throw new Error("Failed to generate embedding");
}

export async function getEmbeddings(
  texts: string[],
  inputType: "search_document" | "search_query" = "search_document"
): Promise<number[][]> {
  // Cohere has a limit of 96 texts per request
  const BATCH_SIZE = 96;
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);

    let response = null;
    try {
      response = await cohere.embed({
        texts: batch,
        model: EMBEDDING_MODEL,
        inputType,
      });
      // console.log(response);
    } catch (error) {
      console.error(
        `Error generating embeddings for batch starting at ${i}:`,
        error
      );
      throw new Error(
        `Failed to generate embeddings for batch starting at ${i}`
      );
    }

    if (response.embeddings && Array.isArray(response.embeddings)) {
      allEmbeddings.push(...response.embeddings);
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
