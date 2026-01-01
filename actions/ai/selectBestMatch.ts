"use server";

import { Food } from "@/types/db";
import { getGroqChatCompletion } from "./completion";

const BEST_MATCH_SYSTEM_PROMPT = `You are a nutrition database matcher. Given a user's food search term and a list of candidate foods from a database, select the single best match.

Rules:
1. Consider semantic meaning, not just text similarity
2. "chicken breast" should match "Chicken, broilers or fryers, breast" over "Chicken, canned"
3. Generic terms like "apple" should match the plain/raw version over processed variants
4. If the user specifies preparation (e.g., "grilled salmon"), prefer raw/unprocessed if no exact match
5. Consider the category as additional context

Output ONLY a single number (1-indexed) representing the best match. No explanation, no text, just the number.
If none of the candidates are reasonable matches, output 0.`;

export type MatchCandidate = Pick<Food, "id" | "name" | "category">;

export async function selectBestMatch(
  searchTerm: string,
  candidates: MatchCandidate[]
): Promise<Food["id"] | null> {
  if (candidates.length === 0) {
    return null;
  }

  if (candidates.length === 1) {
    return candidates[0].id;
  }

  // Build the candidate list for the prompt
  const candidateList = candidates
    .map((c, i) => `${i + 1}. "${c.name}" (Category: ${c.category})`)
    .join("\n");

  const userPrompt = `User searched for: "${searchTerm}"

Candidates:
${candidateList}

Which number is the best match?`;

  const response = await getGroqChatCompletion(
    [
      { role: "system", content: BEST_MATCH_SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    undefined,
    { temperature: 0 } // Deterministic output
  );

  const content = response.choices[0]?.message?.content?.trim() || "0";
  const selectedIndex = parseInt(content, 10);

  // Validate the response
  if (
    isNaN(selectedIndex) ||
    selectedIndex < 0 ||
    selectedIndex > candidates.length
  ) {
    console.warn(`Invalid LLM response for best match: "${content}"`);
    // Fall back to first candidate
    return candidates[0].id;
  }

  if (selectedIndex === 0) {
    // LLM determined no good match
    return null;
  }

  return candidates[selectedIndex - 1].id;
}

// Batch version for efficiency when processing multiple foods
export async function selectBestMatches(
  searchTerms: string[],
  candidatesMap: Map<string, MatchCandidate[]>
): Promise<Map<string, Food["id"] | null>> {
  const results = new Map<string, Food["id"] | null>();

  // Process in parallel for better performance
  const promises = searchTerms.map(async (term) => {
    const candidates = candidatesMap.get(term) || [];
    const bestId = await selectBestMatch(term, candidates);
    return { term, bestId };
  });

  const resolved = await Promise.all(promises);

  for (const { term, bestId } of resolved) {
    results.set(term, bestId);
  }

  return results;
}
