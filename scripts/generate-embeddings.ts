import { config } from "dotenv";
config({ path: ".env" });

import { db } from "../db/client";
import { foods } from "../db/schema";
import {
  getEmbeddings as getVoyageEmbeddings,
  serializeEmbedding as serializeVoyageEmbedding,
} from "../actions/ai/voyage";
import {
  getEmbeddings as getCohereEmbeddings,
  serializeEmbedding as serializeCohereEmbedding,
} from "../actions/ai/cohere";
import { eq, isNull } from "drizzle-orm";

const getBatchSize = (provider: "cohere" | "voyage") => {
  return provider === "cohere" ? 96 : 128;
};

async function generateEmbeddings(provider: "cohere" | "voyage") {
  const serializeEmbedding =
    provider === "cohere" ? serializeCohereEmbedding : serializeVoyageEmbedding;

  console.log(`Starting embedding generation with ${provider}...`);

  const BATCH_SIZE = getBatchSize(provider);

  // Get all foods without embeddings
  const foodsWithoutEmbeddings = await db
    .select({ id: foods.id, name: foods.name })
    .from(foods)
    .where(isNull(foods.embedding));

  console.log(
    `Found ${foodsWithoutEmbeddings.length} foods without embeddings`
  );

  if (foodsWithoutEmbeddings.length === 0) {
    console.log("All foods already have embeddings!");
    return;
  }

  let processed = 0;
  let errors = 0;

  let count = 0;

  // Process in batches
  for (let i = 0; i < foodsWithoutEmbeddings.length; i += BATCH_SIZE) {
    if (i > 0) {
      // return;
    }
    const batch = foodsWithoutEmbeddings.slice(i, i + BATCH_SIZE);
    const names = batch.map((f) => f.name);

    try {
      console.log(
        `Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(
          foodsWithoutEmbeddings.length / BATCH_SIZE
        )} (${batch.length} items)...`
      );

      // Generate embeddings for the batch
      const embeddings = await (provider === "cohere"
        ? getCohereEmbeddings(names, "search_document")
        : getVoyageEmbeddings(names, "document"));

      // Update each food with its embedding
      for (let j = 0; j < batch.length; j++) {
        const food = batch[j];
        const embedding = embeddings[j];

        await db
          .update(foods)
          .set({ embedding: serializeEmbedding(embedding) })
          .where(eq(foods.id, food.id));
      }

      processed += batch.length;
      console.log(
        `  ✓ Processed ${processed}/${foodsWithoutEmbeddings.length}`
      );

      count += 1;

      // Small delay to avoid rate limits
      if (i + BATCH_SIZE < foodsWithoutEmbeddings.length && count === 3) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * 60 * 1));
        count = 0;
      }
    } catch (error) {
      console.error(`Error processing batch:`, error);
      errors += batch.length;
    }
  }

  console.log("\n=== Embedding Generation Complete ===");
  console.log(`Total processed: ${processed}`);
  console.log(`Total errors: ${errors}`);
}

const VALID_PROVIDERS = ["cohere", "voyage"];
const provider = process.argv[2] as "cohere" | "voyage";
if (!provider || !VALID_PROVIDERS.includes(provider)) {
  console.error(
    `Please provide a valid provider: ${VALID_PROVIDERS.join(", ")}`
  );
  process.exit(1);
}

generateEmbeddings(provider)
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
